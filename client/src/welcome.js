import { BrowserRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";
import ResetPassword from "./resetpassword";
export default function Welcome() {
    // return (
    //     <>
    //         <h1>Welcome!</h1>
    //         <Registration />
    //     </>
    // );
    return (
        <>
            <aside className="welcomeTextContainer">
                <h1>WELCOME HERE</h1>
                <p>idk network</p>
                <img src="/idk-logos.jpeg" height={100} width={100}></img>
            </aside>
            <BrowserRouter>
                <div>
                    <Route exact path="/">
                        <Registration />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/reset">
                        <ResetPassword />
                    </Route>
                </div>
            </BrowserRouter>
        </>
    );
}
