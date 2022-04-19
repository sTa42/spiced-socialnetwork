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
        <div className="authwrapper">
            <aside className="welcomeTextContainer">
                <img src="/idk-logos.jpeg" height={250} width={250}></img>
                <h1 className="welcomeHeadline">Welcome to IDK networks</h1>
                <p className="welcometext">
                    You don&apos;t know anything?{" "}
                    <strong>Then join now.</strong> Here you can follow people
                    who will think for <strong>you</strong>, so you don&apos;t
                    have to. Our members will only have the best intentions for
                    you in mind. <br></br>
                    <strong>Guaranteed.</strong>
                </p>
            </aside>
            <BrowserRouter>
                <section className="genericAuthContainer">
                    <Route exact path="/">
                        <Registration />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/reset">
                        <ResetPassword />
                    </Route>
                </section>
            </BrowserRouter>
        </div>
    );
}
