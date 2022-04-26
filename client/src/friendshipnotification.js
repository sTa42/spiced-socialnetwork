import { useSelector, useDispatch } from "react-redux";
import { hideFriendRequest } from "./redux/friendnotification/slice";

export default function FriendshipNotification() {
    const dispatch = useDispatch();
    const friendNotifications = useSelector(
        (state) =>
            state.FriendNotifications &&
            state.FriendNotifications.filter((friendship) => {
                return !friendship.seen;
            })
    );
    console.log(friendNotifications);
    return (
        <div className="friendship-popup">
            {friendNotifications.map((notification) => {
                return (
                    <div key={notification.id}>
                        <div style={{ display: "none" }}>
                            {setTimeout(() => {
                                dispatch(hideFriendRequest(notification.id));
                            }, 5000)}
                        </div>
                        {notification.firstname} {notification.lastname} wants
                        to be your friend.
                    </div>
                );
            })}
        </div>
    );
}
