import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import ProfilePic from "./profilepic";
import FriendshipButton from "./friendshipbutton";
import { useNavigate } from "react-router-dom";

export default function OtherProfile(props) {
    const [user, setUser] = useState({});
    const params = useParams();
    const history = useHistory();
    console.log("otherprofile props: ", props);
    useEffect(() => {
        fetch(`/users/find/${params.id}`)
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
                console.log("Location NEW from user", location.pathname);
                // return history.replace("/");
                if (!data.success && data.sameUser) {
                    return history.replace("/");
                }
                if (data.success) {
                    history.push(location.pathname);
                    setUser(data.user);
                }
            })
            .catch((err) => {
                console.log("HERE??", err);
            });
    }, []);
    return (
        <>
            {!user.id && <p>That user does not exist :(</p>}
            {user.id && (
                <>
                    <section className="profile-container">
                        <ProfilePic
                            first={user.firstname}
                            last={user.lastname}
                            imgurl={user.profilepic_url}
                            height={200}
                            width={200}
                            class={"userpic"}
                        />

                        <div className="editProfileContainer">
                            <h1>
                                {user.firstname} {user.lastname}
                            </h1>
                            <p>{user.bio}</p>
                        </div>
                    </section>
                    <FriendshipButton otherUserId={user.id} />
                </>
            )}
        </>
    );
}
