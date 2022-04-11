import { Component } from "react";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";
import Profile from "./profile";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showUploader: false,
            user: {},
        };
        this.clickHandlerShowUploader =
            this.clickHandlerShowUploader.bind(this);
        this.clickHandlerHideUploader =
            this.clickHandlerHideUploader.bind(this);
        this.updateProfilePicture = this.updateProfilePicture.bind(this);
        this.updateBio = this.updateBio.bind(this);
    }
    componentDidMount() {
        fetch("/user")
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
                this.setState({ user: data.user });
                console.log(this.state.user);
            })
            .catch((err) => console.log(err));
    }
    componentWillUnmount() {
        console.log(this.state);
    }
    clickHandlerShowUploader() {
        this.setState({ showUploader: true });
    }
    clickHandlerHideUploader() {
        this.setState({ showUploader: false });
    }
    updateProfilePicture(pictureUrl) {
        this.setState({
            user: { ...this.state.user, profilepic_url: pictureUrl },
        });
    }
    updateBio(newBio) {
        console.log("BIO ARGUMENT FROM APP: ", newBio);
        // this.setState({ user: { ...this.state.user, bio: newBio } });
        console.log("current state: ", this.state);
        this.setState({ user: { ...this.state.user, bio: newBio } });
    }

    render() {
        console.log("FROM RENDER", this.state);
        if (!this.state.user.id) {
            return (
                <img
                    src="/loading.gif"
                    alt="loading"
                    height={400}
                    width={400}
                />
            );
        }

        return (
            <>
                <nav className="navbar">
                    <img src="/idk-logos.jpeg" width={100} height={100}></img>
                    <ProfilePic
                        imgurl={this.state.user.profilepic_url}
                        first={this.state.user.firstname}
                        last={this.state.user.lastname}
                        clickHandlerShowUploader={this.clickHandlerShowUploader}
                    />
                </nav>

                <Profile
                    user={this.state.user}
                    updateBio={this.updateBio}
                    clickHandlerShowUploader={this.clickHandlerShowUploader}
                />

                {this.state.showUploader && (
                    <Uploader
                        updateProfilePicture={this.updateProfilePicture}
                        clickHandlerHideUploader={this.clickHandlerHideUploader}
                    />
                )}
            </>
        );
    }
}
