export default function ProfilePic(props) {
    console.log(props, " FROM PROFILEPIC");
    return (
        <img
            src={props.imgurl || "/blank-profilepic.svg"}
            alt={`${props.first} ${props.last}`}
            onClick={props.clickHandlerShowUploader}
            height={100}
            width={100}
            className="user"
        />
    );
}
