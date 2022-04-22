import { io } from "socket.io-client";
import {
    receiveGeneralChatMessages,
    sendNewMessage,
} from "./redux/generalchat/slice";
export let socket;
export const init = (store) => {
    if (!socket) {
        console.log("Init WebSocket from client");
        socket = io.connect();
    }

    // listen to events
    socket.on("last-10-messages", (data) => {
        // console.log("got last 10 messages", data);
        store.dispatch(receiveGeneralChatMessages(data));
    });
    socket.on("newMessage", (data) => {
        store.dispatch(sendNewMessage(data.message));
        console.log("new stuff", data);
    });
};
