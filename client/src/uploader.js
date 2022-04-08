import { Component } from "react";

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleFileSelectForUploadPicture =
            this.handleFileSelectForUploadPicture.bind(this);
        this.handleUploadProfilePictureSubmit =
            this.handleUploadProfilePictureSubmit.bind(this);
    }
    handleFileSelectForUploadPicture(e) {
        console.log(e);
        console.log(e.target.files[0]);
        // this.setState({ fileToUpload: e.target.files[0] });
        this.setState({ fileToUpload: e.target.files[0] });
        console.log(this.state);
    }
    handleUploadProfilePictureSubmit(e) {
        e.preventDefault();
        const fd = new FormData();
        fd.append("file", this.state.fileToUpload);
        fetch("/user/uploadprofilepicture", {
            method: "POST",
            body: fd,
        })
            .then((resp) => resp.json())
            .then((data) => {
                this.props.updateProfilePicture(data.profilepic_url);
            })
            .catch((err) => {
                console.log("SOMETHING WENT WRONG", err);
            });
    }
    render() {
        return (
            <section style={{ border: "1px solid black" }}>
                <div
                    onClick={this.props.clickHandlerHideUploader}
                    style={{
                        backgroundColor: "black",
                        height: "25px",
                        width: "25px",
                        cursor: "pointer",
                    }}
                ></div>
                <form>
                    <input
                        onChange={this.handleFileSelectForUploadPicture}
                        type="file"
                        name="file"
                        accept="image/*"
                    ></input>
                    <button onClick={this.handleUploadProfilePictureSubmit}>
                        SUBMIT YOUR PROFILE PICTURE
                    </button>
                </form>
            </section>
        );
    }
}
