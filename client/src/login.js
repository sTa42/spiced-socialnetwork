import { Component } from "react";
import { Link, Redirect, Route } from "react-router-dom";
// import { useHistory } from "react-router-dom";
export default class Login extends Component {
    constructor() {
        super();
        this.state = {};
        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    }
    componentDidMount() {
        console.log("Login component got mounted.");
    }
    handleLoginChange({ target }) {
        this.setState({ [target.name]: target.value });
    }
    handleLoginSubmit(e) {
        e.preventDefault();
        fetch("/user/login.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((resp) => resp.json())
            .then((data) => {
                if (data.success) {
                    // <Redirect to="/"></Redirect>;
                    // this.history.replace("/");
                    location.reload();
                } else {
                    this.setState({ error: data.message });
                }
            })
            .catch((err) => {
                console.log("ERROR POSTING LOGIN DATA: ", err);
                this.setState({
                    error: "Something went wrong while SENDING LOGIN DATA",
                });
            });
    }
    render() {
        return (
            <section>
                <h1 className="authHeadline">Login</h1>
                {this.state.error && <h2>{this.state.error}</h2>}
                <form className="authContainer">
                    <input
                        className="authInput"
                        name="email"
                        placeholder="EMAIL"
                        type="email"
                        required
                        onChange={this.handleLoginChange}
                    ></input>
                    <input
                        className="authInput"
                        name="password"
                        placeholder="PASSWORD"
                        type="password"
                        required
                        onChange={this.handleLoginChange}
                    ></input>
                    <button
                        className="genericButton authButton"
                        onClick={this.handleLoginSubmit}
                    >
                        LOGIN
                    </button>
                </form>
                <Link to="/reset" className="authlink">
                    CLICK HERE IF YOU FORGOT YOUR PASSWORD
                </Link>
                <br></br>
                <Link to="/" className="authlink">
                    NO ACCOUNT YET? CLICK HERE
                </Link>
            </section>
        );
    }
}
