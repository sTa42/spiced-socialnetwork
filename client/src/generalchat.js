import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { socket } from "./socket.js";
import { useRef } from "react";
import { useHistory } from "react-router-dom";

import Moment from "react-moment";

export default function GeneralChat() {
    const messages = useSelector((state) => state.GeneralChatMessages);
    const [newMessage, setNewMessage] = useState("");
    const chatContainer = useRef();
    const textArea = useRef();
    const history = useHistory();

    const sendMessage = () => {
        if (newMessage.length > 0) {
            socket.emit("new-message-from-client", {
                message: newMessage,
            });
            setNewMessage("");
            console.log(newMessage);
            textArea.current.setSelectionRange(0, 0);
        }
    };
    const handleChange = (e) => {
        setNewMessage(e.target.value);
    };
    useEffect(() => {
        chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
    }, [messages]);
    return (
        <>
            <h1>Chat with everyone here</h1>
            <div ref={chatContainer} className="chat-messages-container">
                {messages.map((chatMessage) => {
                    return (
                        <div key={chatMessage.id} className="chat-message">
                            <div className="chat-message-header">
                                <img
                                    className="chat-listing-img"
                                    src={
                                        chatMessage.profilepic_url ||
                                        "/blank-profilepic.svg"
                                    }
                                    height={50}
                                    width={50}
                                    alt={`${chatMessage.firstname} ${chatMessage.lastname}`}
                                    onClick={() => {
                                        history.replace(
                                            `/user/${chatMessage.userid}`
                                        );
                                    }}
                                ></img>

                                <div>
                                    <h3>
                                        {chatMessage.firstname}{" "}
                                        {chatMessage.lastname}
                                    </h3>
                                    <h5>
                                        <Moment
                                            format="HH:MM, DD.MM.YYYY"
                                            date={chatMessage.timestamp}
                                        />
                                    </h5>
                                </div>
                            </div>
                            <p className="chat-text">{chatMessage.message}</p>
                        </div>
                    );
                })}
            </div>

            <textarea
                className="chat-composer"
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
            <br></br>
            <button
                className="genericButton"
                onClick={() => {
                    sendMessage();
                }}
            >
                SEND
            </button>
        </>
    );
}
