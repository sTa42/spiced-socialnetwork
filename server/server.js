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
    getBasicUserData,
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

const onlineUsers = {};
io.on("connection", (socket) => {
    console.log("NEW CONNECTION ESTABLIESHED wit: ", socket.id);
    const userId = socket.request.session.userId;
    console.log(userId);
    // send last message
    // db call here
    // check if userId
    if (userId) {
        const onlineUsersForClient = [];
        for (const key in onlineUsers) {
            if (key != userId) {
                onlineUsersForClient.push(onlineUsers[key].data);
            }
        }
        socket.emit("online-users", { onlineUsersForClient });
        if (!onlineUsers[userId]) {
            const user = { sockets: [], data: {} };
            onlineUsers[userId] = user;
            onlineUsers[userId].sockets.push(socket.id);
            getBasicUserData(userId)
                .then(({ rows }) => {
                    console.log(rows);
                    onlineUsers[userId] = {
                        ...onlineUsers[userId],
                        data: rows[0],
                    };
                    console.log(onlineUsers);
                    // io.emit("online-users-change-online", {
                    //     userWentOnline: rows[0],
                    // });
                    socket.broadcast.emit("online-users-change-online", {
                        userWentOnline: rows[0],
                    });
                })
                .catch((err) => {
                    console.log(err);
                    io.emit("error", { error: "something went wrong" });
                });
        } else {
            onlineUsers[userId].sockets.push(socket.id);
        }

        console.log(onlineUsers);

        // getBasicUserData(userId)
        //     .then(({ rows }) => {
        //         console.log(rows);
        //         onlineUsers[userId] = {
        //             ...onlineUsers[userId],
        //             data: rows[0],
        //         };
        //         console.log(onlineUsers);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //         io.emit("error", { error: "something went wrong" });
        //     });
        getLatestGeneralChatMessages()
            .then(({ rows }) => {
                socket.emit("last-10-messages", {
                    messages: rows,
                });
            })
            .catch((err) => {
                console.log(err);
                socket.emit("error", { error: "something went wrong" });
            });

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
        });
        socket.on("disconnect", () => {
            console.log(socket.id, "just dced");
            if (onlineUsers[userId].sockets.length > 1) {
                onlineUsers[userId].sockets = onlineUsers[
                    userId
                ].sockets.filter((item) => {
                    console.log(item, socket.id);
                    if (item != socket.id) {
                        return item;
                    }
                });
            } else if (onlineUsers[userId].sockets.length == 1) {
                // delete onlineUsers[]
                // delete onlineUsers[userId].data;
                // delete onlineUsers[userId].sockets;
                delete onlineUsers[userId];
                // const onlineUsersForClient = [];
                // for (const key in onlineUsers) {
                //     onlineUsersForClient.push(onlineUsers[key].data);
                // }
                // socket.emit("online-users", { onlineUsersForClient });
                socket.broadcast.emit("online-users-change-offline", {
                    userWentOffline: userId,
                });
                // io.emit("online-users-change-offline", {
                //     userWentOffline: userId,
                // });
            }

            console.log("AFTER DC", onlineUsers);
        });
    }
});
