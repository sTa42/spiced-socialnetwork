import ProfilePic from "./profilepic";
import BioEditor from "./bioeditor";
export default function Profile(props) {
    console.log("PROPS IN PROFILE: ", props);
    return (
        <section className="profile-container">
            <ProfilePic
                first={props.user.firstname}
                last={props.user.lastname}
                imgurl={props.user.profilepic_url}
                height={200}
                width={200}
                clickHandlerShowUploader={props.clickHandlerShowUploader}
            />

            <div className="editProfileContainer">
                <h1 className="welcome-msg">
                    Welcome, {props.user.firstname} {props.user.lastname}
                </h1>
                <BioEditor bio={props.user.bio} updateBio={props.updateBio} />
            </div>
        </section>
    );
}
