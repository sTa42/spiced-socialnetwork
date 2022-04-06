import ReactDOM from "react-dom";
// import { Name } from "./name.js";
// import { Counter } from "./counter.js";
import Success from "./success";
import Welcome from "./welcome";

// ReactDOM.render(<Welcome />, document.querySelector("main"));

// function HelloWorld() {
//     return (
//         <div>
//             <div>
//                 Hello, <Name firstName="World" lastName="Nice" />!
//             </div>
//             <div>
//                 {"hello".toUpperCase()}{" "}
//                 <Name firstName="David" lastName="Friedman" />
//             </div>
//             <Counter />
//         </div>
//     );
// }
fetch("/user/id.json")
    .then((response) => response.json())
    .then((data) => {
        console.log("data: ", data.userId);
        if (!data.userId) {
            ReactDOM.render(<Welcome />, document.querySelector("main"));
        } else {
            ReactDOM.render(<Success />, document.querySelector("main"));
        }
    });
