import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import ProfilePic from "./profilepic";
export default function OtherProfile(props) {
    const [user, setUser] = useState({});
    const params = useParams();
    const history = useHistory();
    useEffect(() => {
        fetch(`/users/find/${params.id}`)
            .then((resp) => resp.json())
            .then((data) => {
                if (data.success) {
                    if (data.sameUser) {
                        return history.replace("/");
                    } else {
                        return setUser(data.user);
                    }
                }

                console.log(data);

                // history.push(location.pathname);
            })
            .catch((err) => {
                console.log("HERE??", err);
            });
    }, []);
    return (
        <>
            {!user.id && <p>That user does not exist :(</p>}
            {user.id && (
                <section className="profile-container">
                    <ProfilePic
                        first={user.firstname}
                        last={user.lastname}
                        imgurl={user.profilepic_url}
                        height={200}
                        width={200}
                    />

                    <div className="editProfileContainer">
                        <p>{user.bio}</p>
                    </div>
                </section>
            )}
        </>
    );
}
