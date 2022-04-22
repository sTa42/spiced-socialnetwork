const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const sessionSecret =
    process.env.COOKIE_SECRET || require("./secrets").COOKIE_SECRET;
const cookieSession = require("cookie-session");
const {
    getLatestGeneralChatMessages,
    addChatMessage,
    addChatMessage2,
} = require("./middlewares/db.js");

const server = require("http").Server(app);
const io = require("socket.io")(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith("http://localhost:3000")),
});

const authRouter = require("./routes/user");
const passwordRouter = require("./routes/password");
const usersRouter = require("./routes/users");
const friendshipRouter = require("./routes/friendship");

app.use(compression());
app.use(express.json());
const cookieSessionMiddleware = cookieSession({
    secret: sessionSecret,
    maxAge: 1000 * 60 * 60 * 24 * 14,
    sameSite: true,
});

app.use(cookieSessionMiddleware);

io.use((socket, next) => {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use("/user", authRouter);
app.use("/password", passwordRouter);
app.use("/users", usersRouter);
app.use("/friendship", friendshipRouter);

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

server.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});

io.on("connection", async function (socket) {
    console.log("NEW CONNECTION ESTABLIESHED");
    const userId = socket.request.session.userId;
    console.log(userId);
    // send last message
    // db call here
    // check if userId
    if (userId) {
        getLatestGeneralChatMessages()
            .then(({ rows }) => {
                socket.emit("last-10-messages", {
                    messages: rows,
                });
            })
            .catch();

        socket.on("new-message-from-client", (data) => {
            console.log(data);
            // save to db and broadcast to everyone, get connected to user data
            addChatMessage(userId, data.message)
                .then(({ rows }) => {
                    console.log(rows);
                    io.emit("newMessage", { message: rows[0] });
                })
                .catch();
        });
    }
});
