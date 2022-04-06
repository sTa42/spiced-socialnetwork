import ReactDOM from "react-dom";
import Success from "./success";
import Welcome from "./welcome";

fetch("/user/id.json")
    .then((response) => response.json())
    .then((data) => {
        // console.log("data: ", data.userId);
        if (!data.userId) {
            ReactDOM.render(<Welcome />, document.querySelector("main"));
        } else {
            ReactDOM.render(<Success />, document.querySelector("main"));
        }
    });
