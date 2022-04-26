import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

export default function FindPeople(props) {
    const history = useHistory();
    const onlineUsers = useSelector((state) => state.OnlineUsers);

    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        let abort = false;
        if (search === "") {
            fetch("/users/latest")
                .then((resp) => resp.json())
                .then((data) => {
                    if (!abort) {
                        setUsers(data.users);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            fetch(`/users/${search}`)
                .then((resp) => resp.json())
                .then((data) => {
                    if (!abort) {
                        setUsers(data.users);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        return () => {
            console.log(new Date(), " : ", search);
            abort = true;
        };
    }, [search]);

    return (
        <section className="findpeople-container">
            <div>
                <h1 className="searchHeading">Users currently online</h1>
                <div className="foundpeople-container">
                    {onlineUsers.length == 0 && (
                        <p>No one is online except yourself.🙁 </p>
                    )}
                    {onlineUsers.map((user) => {
                        return (
                            <div
                                className="user-listing"
                                key={user.id}
                                onClick={() => {
                                    history.replace(`/user/${user.id}`);
                                }}
                            >
                                <img
                                    className="listing-img"
                                    src={
                                        user.profilepic_url ||
                                        "/blank-profilepic.svg"
                                    }
                                    height={150}
                                    width={150}
                                ></img>
                                <p>
                                    {user.firstname} {user.lastname}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div>
                <h1 className="searchHeading">Find people by search</h1>
                <input
                    className="genericInput searchUserInput"
                    placeholder="Search by name"
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                ></input>
                <div className="foundpeople-container">
                    {users.map((user) => {
                        return (
                            <div
                                className="user-listing"
                                key={user.id}
                                onClick={() => {
                                    history.replace(`/user/${user.id}`);
                                }}
                            >
                                <img
                                    className="listing-img"
                                    src={
                                        user.profilepic_url ||
                                        "/blank-profilepic.svg"
                                    }
                                    height={150}
                                    width={150}
                                ></img>
                                <p>
                                    {user.firstname} {user.lastname}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
