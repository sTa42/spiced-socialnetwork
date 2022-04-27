import { useParams, useHistory } from "react-router-dom";
import { socket } from "./socket.js";
import { useState, useEffect, useRef } from "react";
import Moment from "react-moment";

export default function PrivateChat() {
    const params = useParams();
    const history = useHistory();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [sender, setSender] = useState("");
    const [recipient, setRecipient] = useState("");
    const [error, setError] = useState("");
    const chatContainer = useRef();
    const textArea = useRef();

    useEffect(() => {
        let isApiSubscribed = true;
        socket.emit("get-latest-private-messages-for-user", {
            userToChatWith: params.id,
        });
        return () => {
            // cancel the subscription
            isApiSubscribed = false;
        };
    }, []);
    useEffect(() => {
        let isApiSubscribed = true;
        chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
        return () => {
            // cancel the subscription
            isApiSubscribed = false;
        };
    }, [messages]);
    socket.on("latest-messages-for-user", (data) => {
        console.log(data);

        setMessages(data.rows);
        setSender(data.sender);
        setRecipient(data.recipient);
    });
    socket.on("new-messages-for-user", (data) => {
        // console.log("add this to locatl state: ", data.newMessage);
        setMessages([...messages, data.newMessage]);
    });
    socket.on("error", (data) => {
        console.log(data);
        setError(data);
    });

    const sendMessage = () => {
        if (newMessage.length > 0) {
            socket.emit("add-private-message-for-user", {
                userToChatWith: params.id,
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

    // console.log("params", params);
    return (
        <>
            {" "}
            {error && (
                <p>
                    You are not friends with {error.firstname} {error.lastname}
                </p>
            )}
            {!error && (
                <>
                    {" "}
                    <h1>
                        Chat with {recipient.firstname} {recipient.lastname}
                    </h1>
                    <div
                        ref={chatContainer}
                        className="chat-messages-container"
                    >
                        {messages.map((chatMessage) => {
                            return (
                                <div
                                    key={chatMessage.id}
                                    className="chat-message"
                                >
                                    <div className="chat-message-header">
                                        <img
                                            className="chat-listing-img"
                                            src={
                                                (chatMessage.sender_id ==
                                                sender.id
                                                    ? sender.profilepic_url
                                                    : recipient.profilepic_url) ||
                                                "/blank-profilepic.svg"
                                            }
                                            height={50}
                                            width={50}
                                            alt={
                                                chatMessage.sender_id ==
                                                sender.id
                                                    ? `${sender.firstname} ${sender.lastname}`
                                                    : `${recipient.firstname} ${recipient.lastname}`
                                            }
                                            onClick={() => {
                                                history.replace(
                                                    `/user/${chatMessage.sender_id}`
                                                );
                                            }}
                                        ></img>

                                        <div>
                                            <h3>
                                                {chatMessage.sender_id ==
                                                    sender.id && (
                                                    <>{sender.firstname}</>
                                                )}
                                                {chatMessage.sender_id ==
                                                    recipient.id && (
                                                    <>{recipient.firstname}</>
                                                )}{" "}
                                                {chatMessage.sender_id ==
                                                    sender.id && (
                                                    <>{sender.lastname}</>
                                                )}
                                                {chatMessage.sender_id ==
                                                    recipient.id && (
                                                    <>{recipient.lastname}</>
                                                )}
                                            </h3>
                                            <h5>
                                                <Moment
                                                    format="HH:mm, DD.MM.YYYY"
                                                    date={chatMessage.timestamp}
                                                />
                                            </h5>
                                        </div>
                                    </div>
                                    <p className="chat-text">
                                        {chatMessage.message}
                                    </p>
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
                        ref={textArea}
                        value={newMessage}
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
            )}
        </>
    );
}
