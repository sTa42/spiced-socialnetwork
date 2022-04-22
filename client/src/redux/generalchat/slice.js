export default function generalChatMessagesReducer(
    generalChatMessages = [],
    action
) {
    if (action.type === "generalChatMessages/received") {
        generalChatMessages = action.payload.messages.reverse();
    } else if (action.type === "generalChatMessages/newMessageSent") {
        console.log(action.payload.message);
        generalChatMessages = [...generalChatMessages, action.payload.message];
    }

    return generalChatMessages;
}

export function receiveGeneralChatMessages(messages) {
    return { type: "generalChatMessages/received", payload: messages };
}
export function sendNewMessage(message) {
    return {
        type: "generalChatMessages/newMessageSent",
        payload: { message },
    };
}
