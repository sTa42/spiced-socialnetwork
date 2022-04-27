import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function FriendsNavLink() {
    const friendNotifications = useSelector(
        (state) => state.FriendNotifications
    );
    const wannabees = useSelector(
        (state) =>
            state.FriendsAndWannaBees &&
            state.FriendsAndWannaBees.filter(
                (friendship) =>
                    !friendship.status &&
                    friendship.sender != friendship.requester
            )
    );
    // console.log(friendNotifications);

    return (
        <Link to="/friends" className="navlink">
            FRIENDS
            {friendNotifications.length > 0 && (
                <sup className="online-users">
                    ({friendNotifications.length})
                </sup>
            )}
        </Link>
    );
}
