export default function friendNotificationReducer(
    friendNotifications = [],
    action
) {
    if (action.type === "friendNotifications/received") {
        console.log("From Slice: ", action.payload);
        friendNotifications = action.payload.open_friendships.map(
            (friendship) => {
                friendship.seen = true;
                return friendship;
            }
        );
    } else if (action.type === "friendNotifications/friendRequestRemoved") {
        console.log("Remove Friend Request: ", action.payload);
        friendNotifications = friendNotifications.filter((notification) => {
            if (notification.sender_id != action.payload.userId) {
                return notification;
            }
        });
    } else if (action.type === "friendNotifications/friendRequestHidden") {
        console.log("Hide Friend Request: ", action.payload);
        friendNotifications = friendNotifications.map((notification) => {
            if (notification.id == action.payload.notificationId) {
                notification = { ...notification, seen: true };
            }
            return notification;
        });
    } else if (action.type === "friendNotifications/friendRequestMade") {
        console.log("New Friend Request: ", action.payload.user);
        action.payload.user.seen = false;
        friendNotifications = [...friendNotifications, action.payload.user];
    }
    console.log("Current: FriendNotifications", friendNotifications);
    return friendNotifications;
}

export function receiveFriendRequests(openFriendshipRequests) {
    return {
        type: "friendNotifications/received",
        payload: openFriendshipRequests,
    };
}
export function removeFriendRequest(userId) {
    return {
        type: "friendNotifications/friendRequestRemoved",
        payload: { userId },
    };
}
export function hideFriendRequest(notificationId) {
    return {
        type: "friendNotifications/friendRequestHidden",
        payload: { notificationId },
    };
}
export function newFriendRequest(user) {
    return {
        type: "friendNotifications/friendRequestMade",
        payload: { user },
    };
}
