import { Component } from "react";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = { showTextArea: false, biodraft: "" };
        this.handleBioEditorChange = this.handleBioEditorChange.bind(this);
        this.handleBioEditorSubmit = this.handleBioEditorSubmit.bind(this);
        this.showTextArea = this.showTextArea.bind(this);
        this.setBio = this.setBio.bind(this);
    }
    componentDidMount() {
        console.log("BioEditor component  got mounted.");
        console.log("PROPS PASSED TO BIO: ", this.props);
        if (this.props.bio) {
            this.setState({ biodraft: this.props.bio });
        }
    }
    handleBioEditorChange({ target }) {
        console.log(target.value);
        console.log(target.name);
        this.setState({ [target.name]: target.value });
    }
    handleBioEditorSubmit(e) {
        e.preventDefault();
        console.log("VALUE TO SUBMIT VALUE ", this.state);
        fetch("/user/bio", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
                if (data.success) {
                    console.log("TRANSMIT WAS SUCCESSFUL");
                    this.setBio(data.bio);
                    this.setState({ biodraft: this.props.bio });
                    this.setState({ showTextArea: false });
                }
            })
            .catch((err) => console.log(err));
    }
    showTextArea() {
        this.setState({ showTextArea: true });
    }
    setBio(bio) {
        console.log("UPDATE BIO FUNCIOTN", bio);
        console.log("PROPS ACCESIBLE IN BIO", this.props);
        this.props.updateBio(bio);
    }
    render() {
        return (
            <section style={{ border: "1px green solid" }}>
                {this.state.showTextArea && (
                    <div>
                        <h1>TEXT AREA STUFF</h1>
                        <form>
                            <textarea
                                name="biodraft"
                                onChange={this.handleBioEditorChange}
                                value={this.state.biodraft}
                            ></textarea>
                            <button onClick={this.handleBioEditorSubmit}>
                                SAVE
                            </button>
                        </form>
                    </div>
                )}
                {!this.state.showTextArea && !this.props.bio && (
                    <>
                        <p>HELLO THERE IS NULLISH BIO</p>
                        <button onClick={this.showTextArea}>Add a bio</button>
                    </>
                )}
                {!this.state.showTextArea && this.props.bio && (
                    <>
                        <p>{this.props.bio}</p>
                        <button onClick={this.showTextArea}>
                            Edit your bio
                        </button>
                    </>
                )}
            </section>
        );
    }
}
