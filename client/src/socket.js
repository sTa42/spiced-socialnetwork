import { io } from "socket.io-client";
import {
    receiveGeneralChatMessages,
    sendNewMessage,
} from "./redux/generalchat/slice";
import {
    receiveOnlineUsers,
    userOffline,
    userOnline,
} from "./redux/onlineusers/slice";
import {
    receiveFriendRequests,
    newFriendRequest,
    removeFriendRequest,
} from "./redux/friendnotification/slice";
export let socket;
export const init = (store) => {
    if (!socket) {
        console.log("Init WebSocket from client");
        socket = io.connect();
    }

    // listen to events
    socket.on("last-10-messages", (data) => {
        console.log("got last 10 messages", data);
        store.dispatch(receiveGeneralChatMessages(data));
    });
    socket.on("online-users", (data) => {
        // console.log(data);
        store.dispatch(receiveOnlineUsers(data));
    });
    socket.on("online-users-change-offline", ({ userWentOffline }) => {
        store.dispatch(userOffline(userWentOffline));
        // console.log(data);
    });
    socket.on("online-users-change-online", ({ userWentOnline }) => {
        console.log("SOCKET  JS ", userWentOnline);
        store.dispatch(userOnline(userWentOnline));
    });
    socket.on("open-friendship-requests", (data) => {
        console.log("open friendship requests", data);
        store.dispatch(receiveFriendRequests(data));
    });
    socket.on("new-friendship-request-client", ({ new_friendrequest }) => {
        console.log("DATA FROM SERVER FRIENDREUQESt", new_friendrequest);
        store.dispatch(newFriendRequest(new_friendrequest));
    });
    socket.on("remove-friendship-request-client", ({ sender }) => {
        console.log("DATA FROM SERVER FRIENDREUQESt", sender);
        store.dispatch(removeFriendRequest(sender));
    });
    socket.on("newMessage", (data) => {
        store.dispatch(sendNewMessage(data.message));
        console.log("new stuff", data);
    });
};
