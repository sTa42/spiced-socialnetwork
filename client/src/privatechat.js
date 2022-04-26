import { useParams } from "react-router-dom";

export default function PrivateChat() {
    const params = useParams();

    console.log("params", params);
    return (
        <>
            <div>Hello Private Chat</div>
        </>
    );
}
