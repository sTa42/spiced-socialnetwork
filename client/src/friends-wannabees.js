import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    asyncReceiveFriendsAndWannaBees,
    asyncAcceptFriend,
    asyncDeleteFriend,
} from "./redux/friends/slice";
import { removeFriendRequest } from "./redux/friendnotification/slice";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

export default function FriendsAndWannaBees() {
    const history = useHistory();
    const dispatch = useDispatch();
    const friendNotifications = useSelector(
        (state) =>
            state.FriendNotifications &&
            state.FriendNotifications.filter((friendship) => {
                return !friendship.seen;
            })
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
    const friends = useSelector(
        (state) =>
            state.FriendsAndWannaBees &&
            state.FriendsAndWannaBees.filter((friendship) => friendship.status)
    );
    const friendsWantToBeWith = useSelector(
        (state) =>
            state.FriendsAndWannaBees &&
            state.FriendsAndWannaBees.filter(
                (friendship) =>
                    !friendship.status &&
                    friendship.sender == friendship.requester
            )
    );
    useEffect(() => {
        // fetch friends data
        //once you have data, call dispatch, pass it an action to redux
        // fetch("/friendship/friendsAll2")
        //     .then((resp) => resp.json())
        //     .then((data) => {
        //         console.log(data);
        //         dispatch(receiveFriendsAndWannaBees(data));
        //     })
        //     .catch((err) => console.log(err));
        dispatch(asyncReceiveFriendsAndWannaBees());
    }, []);
    const handleFriendAccept = (id) => {
        // fetch("/friendship/accept", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({ otherUserId: id }),
        // })
        //     .then((resp) => resp.json())
        //     .then((data) => {
        //         console.log(data);
        //         if (data.success) {
        //             dispatch(acceptFriend(id));
        //         }
        //     })
        //     .catch((err) => console.log(err));

        dispatch(asyncAcceptFriend(id));
        dispatch(removeFriendRequest(id));
    };
    const handleFriendDelete = (id) => {
        // fetch("/friendship/reject", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({ otherUserId: id }),
        // })
        //     .then((resp) => resp.json())
        //     .then((data) => {
        //         console.log(data);
        //         if (data.success) {
        //             dispatch(deleteFriend(id));
        //         }
        //     })
        //     .catch((err) => console.log(err));
        dispatch(asyncDeleteFriend(id));
        dispatch(removeFriendRequest(id));
    };

    return (
        <section className="friends-container">
            <div>
                <h1 className="friendSectionHeadline">Your friends</h1>
                {friends.length == 0 && (
                    <p>
                        You currently don&apos;t have any friends. Click{" "}
                        <Link className="inlinelink" to="/users">
                            <strong>here</strong>
                        </Link>{" "}
                        to find some people to make friends with.
                    </p>
                )}
                <div className="friendsSection-container">
                    {friends.map((friend) => {
                        return (
                            <div className="user-container" key={friend.id}>
                                <div
                                    className="user-listing"
                                    key={friend.id}
                                    onClick={() => {
                                        history.replace(`/user/${friend.id}`);
                                    }}
                                >
                                    <img
                                        className="listing-img"
                                        src={
                                            friend.profilepic_url ||
                                            "/blank-profilepic.svg"
                                        }
                                        height={150}
                                        width={150}
                                    ></img>
                                    <p>
                                        {friend.firstname} {friend.lastname}
                                    </p>
                                </div>
                                <div className="friendButtons">
                                    <button
                                        className="genericButton"
                                        onClick={() => {
                                            handleFriendDelete(friend.id);
                                        }}
                                    >
                                        END FRIENDSHIP
                                    </button>
                                    <button
                                        className="genericButton"
                                        onClick={() => {
                                            history.replace(
                                                `/user/${friend.id}/chat`
                                            );
                                        }}
                                    >
                                        SEND MESSAGE
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div>
                <h1 className="friendSectionHeadline">
                    Friend requests from other people
                </h1>
                {wannabees.length == 0 && (
                    <p>
                        You currently don&apos;t have any friend requests from
                        other people.
                    </p>
                )}
                <div className="friendsSection-container">
                    {wannabees.map((wannabee) => {
                        return (
                            <div className="user-container" key={wannabee.id}>
                                <div
                                    className="user-listing"
                                    onClick={() => {
                                        history.replace(`/user/${wannabee.id}`);
                                    }}
                                >
                                    <img
                                        className="listing-img"
                                        src={
                                            wannabee.profilepic_url ||
                                            "/blank-profilepic.svg"
                                        }
                                        height={150}
                                        width={150}
                                    ></img>
                                    <p>
                                        {wannabee.firstname} {wannabee.lastname}
                                    </p>
                                </div>
                                <div className="friendButtons">
                                    <button
                                        className="genericButton"
                                        onClick={() => {
                                            handleFriendAccept(wannabee.id);
                                        }}
                                    >
                                        ACCEPT FRIEND REQUEST
                                    </button>
                                    <button
                                        className="genericButton"
                                        onClick={() => {
                                            handleFriendDelete(wannabee.id);
                                        }}
                                    >
                                        REJECT FRIEND REQUEST
                                    </button>
                                </div>
                                {/* </div> */}
                            </div>
                        );
                    })}
                </div>
            </div>
            <div>
                <h1 className="friendSectionHeadline">
                    Friend requests you made to
                </h1>
                {friendsWantToBeWith.length == 0 && (
                    <p>
                        You currently don&apos;t have any pending friend
                        requests.
                    </p>
                )}
                <div className="friendsSection-container">
                    {friendsWantToBeWith.map((friendToBe) => {
                        return (
                            <div className="user-container" key={friendToBe.id}>
                                <div
                                    className="user-listing"
                                    onClick={() => {
                                        history.replace(
                                            `/user/${friendToBe.id}`
                                        );
                                    }}
                                >
                                    <img
                                        className="listing-img"
                                        src={
                                            friendToBe.profilepic_url ||
                                            "/blank-profilepic.svg"
                                        }
                                        height={150}
                                        width={150}
                                    ></img>
                                    <p>
                                        {friendToBe.firstname}{" "}
                                        {friendToBe.lastname}
                                    </p>
                                </div>
                                <div className="friendButtons">
                                    <button
                                        className="genericButton"
                                        onClick={() => {
                                            handleFriendDelete(friendToBe.id);
                                        }}
                                    >
                                        CANCEL FRIEND REQUEST
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
