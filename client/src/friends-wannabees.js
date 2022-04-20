import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    receiveFriendsAndWannaBees,
    acceptFriend,
    deleteFriend,
} from "./redux/friends/slice";
export default function FriendsAndWannaBees() {
    const dispatch = useDispatch();
    const wannabees = useSelector(
        (state) =>
            state.FriendsAndWannaBees &&
            state.FriendsAndWannaBees.filter((friendship) => !friendship.status)
    );
    const friends = useSelector(
        (state) =>
            state.FriendsAndWannaBees &&
            state.FriendsAndWannaBees.filter((friendship) => friendship.status)
    );
    useEffect(() => {
        // fetch friends data
        //once you have data, call dispatch, pass it an action to redux
        fetch("/friendship/friendsAll")
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
                dispatch(receiveFriendsAndWannaBees(data));
            })
            .catch((err) => console.log(err));
    }, []);
    const handleFriendAccept = (id) => {
        fetch("/friendship/accept", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ otherUserId: id }),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
                if (data.success) {
                    dispatch(acceptFriend(id));
                }
            })
            .catch((err) => console.log(err));
    };
    const handleFriendDelete = (id) => {
        fetch("/friendship/reject", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ otherUserId: id }),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
                if (data.success) {
                    dispatch(deleteFriend(id));
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <section>
            <h1>Your friends</h1>
            {friends.map((friend) => {
                return (
                    <div key={friend.id}>
                        {friend.firstname} {friend.lastname}
                        Accept Me pls
                        <button
                            onClick={() => {
                                // handleAccept(wannabee.id);
                                handleFriendDelete(friend.id);
                            }}
                        >
                            Hello Pls
                        </button>
                    </div>
                );
            })}

            <h1>Friend requests from other people</h1>
            {wannabees.map((wannabee) => {
                return (
                    <div key={wannabee.id}>
                        {wannabee.firstname} {wannabee.lastname}
                        Accept Me pls
                        <button
                            onClick={() => {
                                // handleAccept(wannabee.id);
                                handleFriendAccept(wannabee.id);
                            }}
                        >
                            Hello Pls
                        </button>
                    </div>
                );
            })}
        </section>
    );
}
