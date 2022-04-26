export default function onlineUsersReducer(onlineUsers = [], action) {
    if (action.type === "onlineUsers/received") {
        // console.log(action.payload);
        onlineUsers = action.payload.onlineUsersForClient;
    } else if (action.type === "onlineUsers/userWentOffline") {
        console.log("THIS ONE GOES OFFLINE", action.payload);
        onlineUsers = onlineUsers.filter((user) => {
            if (user.id != action.payload.userId) {
                return user;
            }
        });
    } else if (action.type === "onlineUsers/userGoesOnline") {
        console.log("THIS ONE GOES ONLINE", action.payload.user);
        onlineUsers = [...onlineUsers, action.payload.user];
    }
    console.log("CURRENT USERS  FROM REDUX AFTER UPDATING", onlineUsers);
    return onlineUsers;
}

export function receiveOnlineUsers(onlinerUser) {
    return { type: "onlineUsers/received", payload: onlinerUser };
}
export function userOffline(userId) {
    return {
        type: "onlineUsers/userWentOffline",
        payload: { userId },
    };
}
export function userOnline(user) {
    return {
        type: "onlineUsers/userGoesOnline",
        payload: { user },
    };
}
