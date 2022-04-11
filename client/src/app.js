import { Component } from "react";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";
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
            <section>
                Hello
                <ProfilePic
                    imgurl={this.state.user.profilepic_url}
                    first={this.state.user.firstname}
                    last={this.state.user.lastname}
                    clickHandlerShowUploader={this.clickHandlerShowUploader}
                />
                {this.state.showUploader && (
                    <Uploader
                        updateProfilePicture={this.updateProfilePicture}
                        clickHandlerHideUploader={this.clickHandlerHideUploader}
                    />
                )}
            </section>
        );
    }
}
