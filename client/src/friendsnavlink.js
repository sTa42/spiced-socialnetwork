import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function FriendsNavLink() {
    const friendNotifications = useSelector(
        (state) => state.FriendNotifications
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
