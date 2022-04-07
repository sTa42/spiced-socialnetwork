import { BrowserRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";
export default function Welcome() {
    // return (
    //     <>
    //         <h1>Welcome!</h1>
    //         <Registration />
    //     </>
    // );
    return (
        <>
            <h1>WELCOME HERE</h1>
            <BrowserRouter>
                <div>
                    <Route exact path="/">
                        <Registration />
                    </Route>
                </div>
                <Route path="/login">
                    <Login />
                </Route>
            </BrowserRouter>
        </>
    );
}
