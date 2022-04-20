// friends and wannabees reducer
export default function friends(friends = [], action) {
    if (action.type === "friends-wannabees/received") {
        friends = action.payload.friends;
    } else if (action.type === "friends-wannabees/accepted") {
        // const newFriendsWannabees = friends.map();
        friends = friends.map((friend) => {
            if (friend.id == action.payload.id) {
                friend = { ...friend, status: true };
            }
            return friend;
        });
        // return newFriendsWannabees;
    } else if (action.type === "friends-wannabees/deleted") {
        friends = friends.filter((friend) => {
            if (friend.id != action.payload.id) {
                return friend;
            }
        });
    }
    // no mutationg of original state, make copies
    return friends;
}

export function receiveFriendsAndWannaBees(friends) {
    return { type: "friends-wannabees/received", payload: { friends } };
}
export function acceptFriend(id) {
    return { type: "friends-wannabees/accepted", payload: { id } };
}
export function deleteFriend(id) {
    return { type: "friends-wannabees/deleted", payload: { id } };
}
