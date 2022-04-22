import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { socket } from "./socket.js";
import { useRef } from "react";

export default function GeneralChat() {
    const messages = useSelector((state) => state.GeneralChatMessages);
    const [newMessage, setNewMessage] = useState("");
    const chatContainer = useRef();
    const textArea = useRef();

    const sendMessage = () => {
        socket.emit("new-message-from-client", {
            message: newMessage,
        });
        setNewMessage("");
        console.log(newMessage);
        textArea.current.setSelectionRange(0, 0);
    };
    const handleChange = (e) => {
        setNewMessage(e.target.value);
    };
    // chatContainer.current.scrollTop = 100;
    // calc clientHeight, scrollHeight
    return (
        <>
            <div>Hello Chat Component</div>
            <div ref={chatContainer} className="chat-messages-container">
                {messages.map((chatMessage) => {
                    return (
                        <div key={chatMessage.id} className="chat-message">
                            <img
                                className="chat-listing-img"
                                src={
                                    chatMessage.profilepic_url ||
                                    "/blank-profilepic.svg"
                                }
                                height={50}
                                width={50}
                                alt={`${chatMessage.firstname} ${chatMessage.lastname}`}
                            ></img>
                            <p>
                                {chatMessage.firstname} {chatMessage.lastname}
                            </p>
                            <p>{chatMessage.message}</p>
                        </div>
                    );
                })}
            </div>

            <textarea
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        sendMessage();
                    }
                }}
                placeholder="Type here..."
                onChange={handleChange}
                value={newMessage}
                ref={textArea}
            ></textarea>
            <button
                onClick={() => {
                    sendMessage();
                }}
            >
                SEND
            </button>
        </>
    );
}
