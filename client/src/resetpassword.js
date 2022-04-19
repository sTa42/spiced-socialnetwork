import { Component } from "react";
import { Link } from "react-router-dom";

export default class ResetPassword extends Component {
    constructor() {
        super();
        this.state = { stage: 1 };
        this.handleResetPasswordSubmit =
            this.handleResetPasswordSubmit.bind(this);
        this.handleChangeResetPassword =
            this.handleChangeResetPassword.bind(this);
        this.handleResetCodeSubmit = this.handleResetCodeSubmit.bind(this);
    }
    componentDidMount() {
        console.log("ResetPassword got mounted.");
    }
    handleChangeResetPassword({ target }) {
        this.setState({ [target.name]: target.value });
    }
    handleResetPasswordSubmit(e) {
        console.log("USER WANTS TO RESET PASSWORD");
        e.preventDefault();
        fetch("/password/reset", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(this.state),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("After Reset: ", data);
                if (data.success) {
                    this.setState({
                        error: "",
                    });
                    this.setState({ stage: 2 });
                } else {
                    this.setState({
                        error: "Something went wrong, please try again.",
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    error: "Something went wrong on our side, please try again later.",
                });
            });
    }
    handleResetCodeSubmit(e) {
        e.preventDefault();
        console.log("USERS WANTS TO SUBMIT RESET CODE AND NEW PW");
        fetch("/password/reset/verify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("DATA FROM CODE SUBMIT", data);
                if (data.success) {
                    this.setState({
                        error: "",
                    });
                    this.setState({ stage: 3 });
                } else {
                    this.setState({
                        error: "Something went wrong, please try again.",
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    error: "Something went wrong on our side. Please try again later.",
                });
            });
    }
    renderStage() {
        console.log(this.state.stage);
        if (this.state.stage === 1) {
            return (
                <>
                    <form className="authContainer">
                        <input
                            key={1}
                            className="authInput"
                            name="email"
                            placeholder="EMAIL"
                            type="email"
                            required
                            onChange={this.handleChangeResetPassword}
                        ></input>
                        <button
                            className="genericButton authButton"
                            onClick={this.handleResetPasswordSubmit}
                        >
                            RESET PASSWORD
                        </button>
                    </form>
                    <Link to="/login" className="authlink">
                        REMEMBER YOUR PASSWORD? CLICK HERE TO LOGIN
                    </Link>
                    <br></br>
                    <Link to="/" className="authlink">
                        NO ACCOUNT YET? CLICK HERE TO REGISTER
                    </Link>
                </>
            );
        } else if (this.state.stage === 2) {
            return (
                <>
                    <form className="authContainer">
                        <input
                            key={2}
                            className="authInput"
                            name="resetCode"
                            placeholder="RESET CODE"
                            type="text"
                            required
                            onChange={this.handleChangeResetPassword}
                        ></input>
                        <input
                            key={3}
                            className="authInput"
                            name="password"
                            placeholder="PASSWORD"
                            type="password"
                            required
                            onChange={this.handleChangeResetPassword}
                        ></input>
                        <button
                            className="genericButton authButton"
                            onClick={this.handleResetCodeSubmit}
                        >
                            CHANGE PASSWORD
                        </button>
                    </form>
                </>
            );
        } else if (this.state.stage === 3) {
            return (
                <>
                    <p>Password change was successfull.</p>
                    <Link to="/login" className="authlink">
                        Click here to login
                    </Link>
                </>
            );
        }
    }
    render() {
        return (
            <section>
                <h1 className="authHeadline">Reset your password</h1>
                {this.state.error && <h2>{this.state.error}</h2>}
                {this.renderStage()}
            </section>
        );
    }
}
