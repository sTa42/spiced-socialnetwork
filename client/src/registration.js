import { Component } from "react";

export class Registration extends Component {
    constructor() {
        super();
        this.state = { error: "" };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        console.log("Registration component got mounted.");
    }
    handleChange({ target }) {
        // console.log("user is typing in input field");
        // console.log("EVENT: ", target);
        // console.log("INPUT FIELD", target.name);
        // console.log("VALUE: ", target.value);
        this.setState({ [target.name]: target.value });
        // passing function like console.log("registration state updated", this.state), get called after update
    }
    handleSubmit(e) {
        console.log("USER WANTS TO SUBMIT DATA");
        e.preventDefault();
        // console.log("ALL DATA", this.state);
        fetch("/user/register.json", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(this.state),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("DO SOMETHING WITH MY RESPONSE", data);
                if (data.success) {
                    location.reload();
                } else {
                    this.setState({ error: data.message });
                }
            })
            .catch((err) => {
                console.log(err, "on fetch /user/register.json");
                this.setState({
                    error: "Something went wrong while SENDING DATA",
                });
            });
    }
    render() {
        return (
            <section>
                <h1 className="someClass">Registration</h1>
                {this.state.error && <h2>{this.state.error}</h2>}
                <form className="registrationContainer">
                    <input
                        className="registrationInput"
                        name="first"
                        placeholder="FIRST NAME"
                        type="text"
                        required
                        onChange={this.handleChange}
                    ></input>
                    <input
                        className="registrationInput"
                        name="last"
                        placeholder="LAST NAME"
                        type="text"
                        required
                        onChange={this.handleChange}
                    ></input>
                    <input
                        className="registrationInput"
                        name="email"
                        placeholder="EMAIL"
                        type="email"
                        required
                        onChange={this.handleChange}
                    ></input>
                    <input
                        className="registrationInput"
                        name="password"
                        placeholder="PASSWORD"
                        type="password"
                        required
                        onChange={this.handleChange}
                    ></input>
                    <button onClick={this.handleSubmit}>REGISTER</button>
                </form>
            </section>
        );
    }
}
