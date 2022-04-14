import { useState, useEffect } from "react";

export default function FriendshipButton(props) {
    console.log("FIRNEDSHIP BUTON GOT MOUNTED with: ", props);
    const [friendShipStatus, setFriendShipStatus] = useState("");
    const handleSubmit = ({ target: { name: buttonname } }) => {
        const fetchRoutes = {
            MAKE: "/make",
            ACCEPT: "/accept",
            REJECT: "/reject",
            END: "/reject",
            CANCEL: "/reject",
        };
        // const route = fetchRoutes.find((element) => element[buttonname]);
        // console.log("my button name is ", buttonname);
        // console.log(route);
        fetch(`/friendship/${fetchRoutes[buttonname]}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ otherUserId: props.otherUserId }),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);

                if (data.success) {
                    if (buttonname == "MAKE") {
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

    // if (friendShipStatus == "ACCEPT") {
    //     return (
    //         <>
    //             <button
    //                 className="friendsButton"
    //                 name="ACCEPT"
    //                 onClick={handleSubmit}
    //             >
    //                 ACCEPT FRIENDSHIP REQUEST
    //             </button>
    //             <button
    //                 className="friendsButton"
    //                 name="REJECT"
    //                 onClick={handleSubmit}
    //             >
    //                 REJECT FRIENDSHIP REQUEST
    //             </button>
    //         </>
    //     );
    // } else if (friendShipStatus == "END") {
    //     return (
    //         <button className="friendsButton" name="END" onClick={handleSubmit}>
    //             END FRIENDSHIP
    //         </button>
    //     );
    // } else if (friendShipStatus == "CANCEL") {
    //     return (
    //         <button
    //             className="friendsButton"
    //             name="CANCEL"
    //             onClick={handleSubmit}
    //         >
    //             CANCEL FRIENDSHIP REQUEST
    //         </button>
    //     );
    // } else {
    //     return (
    //         <button
    //             className="friendsButton"
    //             name="MAKE"
    //             onClick={handleSubmit}
    //         >
    //             MAKE FRIENDSHIP REQUEST
    //         </button>
    //     );
    // }
    return (
        <div className="friendButtons">
            {friendShipStatus == "ACCEPT" && (
                <>
                    <button
                        className="genericButton"
                        name="ACCEPT"
                        onClick={handleSubmit}
                    >
                        ACCEPT FRIEND REQUEST
                    </button>
                    <button
                        className="genericButton"
                        name="REJECT"
                        onClick={handleSubmit}
                    >
                        REJECT FRIEND REQUEST
                    </button>
                </>
            )}
            {friendShipStatus == "END" && (
                <button
                    className="genericButton"
                    name="END"
                    onClick={handleSubmit}
                >
                    END FRIENDSHIP
                </button>
            )}
            {friendShipStatus == "CANCEL" && (
                <button
                    className="genericButton"
                    name="CANCEL"
                    onClick={handleSubmit}
                >
                    CANCEL FRIEND REQUEST
                </button>
            )}
            {friendShipStatus == "" && (
                <button
                    className="genericButton"
                    name="MAKE"
                    onClick={handleSubmit}
                >
                    SEND FRIEND REQUEST
                </button>
            )}
        </div>
    );
}
