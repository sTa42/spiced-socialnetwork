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
    getUserById,
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
            Promise.all([
                getUserById(userId),
                addChatMessage(userId, data.message),
            ])
                .then((data) => {
                    console.log(data);
                    console.log(data[0].rows[0]);
                    console.log(data[1].rows[0]);
                    io.emit("newMessage", {
                        message: {
                            id: data[1].rows[0].id,
                            userid: data[1].rows[0].sender_id,
                            message: data[1].rows[0].message,
                            timestamp: data[1].rows[0].timestamp,
                            firstname: data[0].rows[0].firstname,
                            lastname: data[0].rows[0].lastname,
                            profilepic_url: data[0].rows[0].profilepic_url,
                        },
                    });
                })
                .catch((err) => {
                    console.log(err);
                    io.emit("error", { error: "something went wrong" });
                });

            // addChatMessage(userId, data.message)
            //     .then(({ rows }) => {
            //         console.log(rows);
            //         io.emit("newMessage", { message: rows[0] });
            //     })
            //     .catch();
        });
    }
});
