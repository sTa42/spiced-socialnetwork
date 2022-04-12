import { useState, useEffect } from "react";
export default function FindPeople(props) {
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
            <h1>FIND PEOPLE</h1>
            <input
                className="genericInput"
                placeholder="Search by name"
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
            ></input>
            <div className="foundpeople-container">
                {users.map((user) => {
                    return (
                        <div className="user-listing" key={user.id}>
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
        </section>
    );
}
