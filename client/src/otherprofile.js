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
                if (data.sameUser) {
                    return history.replace("/");
                }
                console.log(data);
                setUser(data.user);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
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
    );
}
