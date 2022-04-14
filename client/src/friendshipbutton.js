import { useState, useEffect } from "react";

export default function FriendshipButton(props) {
    console.log("FIRNEDSHIP BUTON GOT MOUNTED with: ", props);
    const [friendShipStatus, setFriendShipStatus] = useState("");
    const handleSubmit = ({ target: { name: buttonname } }) => {
        const fetchRoutes = [
            { MAKE: "make" },
            { ACCEPT: "accept" },
            { REJECT: "reject" },
            { END: "reject" },
            { CANCEL: "reject" },
        ];
        const route = fetchRoutes.find((element) => element[buttonname]);
        console.log("my button name is ", buttonname);
        console.log(route);
        fetch(`/friendship/${route[buttonname]}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ otherUserId: props.otherUserId }),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);

                if (data.success) {
                    if (buttonname == "MAKE") {
                        console.log("set status to cancel");
                        setFriendShipStatus("CANCEL");
                    } else if (
                        buttonname == "END" ||
                        buttonname == "REJECT" ||
                        buttonname == "CANCEL"
                    ) {
                        setFriendShipStatus("");
                    } else if (buttonname == "ACCEPT") {
                        setFriendShipStatus("END");
                    }
                }
            })
            .catch((err) => console.log("ERROR CHANGING FRIENDSHIP", err));
    };

    useEffect(() => {
        fetch(`/friendship/status/${props.otherUserId}`)
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
                if (!data.error && !data.success) {
                    setFriendShipStatus("");
                } else if (data.success) {
                    if (data.friendship) {
                        setFriendShipStatus("END");
                    } else if (
                        !data.friendship &&
                        data.sender == props.otherUserId
                    ) {
                        setFriendShipStatus("ACCEPT");
                    } else {
                        setFriendShipStatus("CANCEL");
                    }
                }
            })
            .catch((err) => console.log(err));
    }, []);

    if (friendShipStatus == "ACCEPT") {
        return (
            <>
                <button name="ACCEPT" onClick={handleSubmit}>
                    ACCEPT FRIENDSHIP REQUEST
                </button>
                <button name="REJECT" onClick={handleSubmit}>
                    REJECT FRIENDSHIP REQUEST
                </button>
            </>
        );
    } else if (friendShipStatus == "END") {
        return (
            <button name="END" onClick={handleSubmit}>
                END FRIENDSHIP
            </button>
        );
    } else if (friendShipStatus == "CANCEL") {
        return (
            <button name="CANCEL" onClick={handleSubmit}>
                CANCEL FRIENDSHIP REQUEST
            </button>
        );
    } else {
        return (
            <button name="MAKE" onClick={handleSubmit}>
                MAKE FRIENDSHIP REQUEST
            </button>
        );
    }
}
