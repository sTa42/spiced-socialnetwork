import ProfilePic from "./profilepic";
import BioEditor from "./bioeditor";
export default function Profile(props) {
    console.log("PROPS IN PROFILE: ", props);
    return (
        <div>
            <h1>HELLO FROM PROFILE COMPONENT</h1>
            <h2>
                Hello {props.user.firstname} {props.user.lastname}
            </h2>
            <BioEditor bio={props.user.bio} updateBio={props.updateBio} />
            <ProfilePic
                first={props.user.first}
                last={props.user.last}
                imgurl={props.user.profilepic_url}
                height={200}
                width={200}
            />
        </div>
    );
}
