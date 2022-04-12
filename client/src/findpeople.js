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
            abort = true;
        };
    }, [search]);

    return (
        <section>
            <h1>FIND PEOPLE</h1>
            <input
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
            ></input>
            <div className="findpeople-container">
                {users.map((user) => {
                    return (
                        <div key={user.id}>
                            <img
                                src={user.profilepic_url}
                                height={100}
                                width={100}
                            ></img>
                            {user.firstname} {user.lastname}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
