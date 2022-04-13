export default function ProfilePic(props) {
    console.log("PROPS FROM PROFILEPICTURE", props);
    return (
        <img
            src={props.imgurl || "/blank-profilepic.svg"}
            alt={`${props.first} ${props.last}`}
            onClick={props.clickHandler}
            height={props.height || 100}
            width={props.width || 100}
            className="userpic profilepic"
        />
    );
}
