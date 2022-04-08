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
    render() {
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
                <ProfilePic
                    imgurl={this.state.user.profilepic_url}
                    first={this.state.user.firstname}
                    last={this.state.user.lastname}
                    clickHandlerShowUploader={() => {
                        this.setState({ showUploader: true });
                    }}
                />
                {this.state.showUploader && (
                    <Uploader
                        updateProfilePicture={(url) => {
                            this.setState({ user: { profilepic_url: url } });
                        }}
                        clickHandlerHideUploader={() => {
                            this.setState({ showUploader: false });
                        }}
                    />
                )}
            </>
        );
    }
}
