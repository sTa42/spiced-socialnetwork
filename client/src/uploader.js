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
        // console.log(e);
        // console.log(e.target.files[0]);
        // this.setState({ fileToUpload: e.target.files[0] });
        // this.setState({ fileToUpload: e.target.files[0] });
        this.handleUploadProfilePictureSubmit(e.target.files[0]);
        // console.log(this.state);
    }
    handleUploadProfilePictureSubmit(file) {
        // e.preventDefault();
        const fd = new FormData();
        fd.append("file", file);
        fetch("/user/uploadprofilepicture", {
            method: "POST",
            body: fd,
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("AWS RESPONSE", data);
                this.props.updateProfilePicture(data.url);
                this.props.clickHandlerHideUploader();
            })
            .catch((err) => {
                this.setState({
                    err: "Something went wrong uploading your picture, maybe try one with a smaller file size.",
                });
                console.log("SOMETHING WENT WRONG", err);
            });
    }
    render() {
        return (
            <div className="profileModal" style={{ border: "1px solid black" }}>
                {/* <img
                    className="close"
                    onClick={this.props.clickHandlerHideUploader}
                    src={"/close-button.png"}
                    height={50}
                    width={50}
                ></img> */}
                <section className="pictureuploadmodal">
                    <img
                        className="close"
                        onClick={this.props.clickHandlerHideUploader}
                        src={"/close-button.png"}
                        height={50}
                        width={50}
                    ></img>
                    {!this.state.err && (
                        <p>Do you want to change your profile picture?</p>
                    )}
                    {this.state.err && <p>{this.state.err}</p>}

                    <form onSubmit={this.handleUploadProfilePictureSubmit}>
                        <input
                            className="file"
                            onChange={this.handleFileSelectForUploadPicture}
                            type="file"
                            name="file"
                            id="file"
                            accept="image/*"
                        ></input>
                        <label htmlFor="file">
                            <img
                                src="/upload.svg"
                                height={100}
                                width={100}
                            ></img>
                        </label>
                    </form>
                </section>
            </div>
        );
    }
}
