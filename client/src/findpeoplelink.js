import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function FindPeopleLink() {
    const onlineUsers = useSelector((state) => state.OnlineUsers);

    return (
        <Link to="/users" className="navlink">
            FIND PEOPLE
            {onlineUsers.length > 0 && (
                <sup className="online-users">({onlineUsers.length})</sup>
            )}
        </Link>
    );
}
