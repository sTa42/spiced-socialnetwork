import React from "react";
export class Counter extends React.Component {
    constructor() {
        super();
        this.state = { count: 0, wasClicked: false };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        console.log("CLICKED");
        // this.setState({ count: this.state.count + 1 });
        this.setState((prevState) => {
            return { count: prevState.count + 1 };
        });
    }
    componentDidMount() {
        console.log("component got mounted");
    }

    render() {
        console.log(this.state);
        return (
            <section>
                <h1>Counter</h1>
                <p>Count: {this.state.count}</p>
                <button onClick={this.handleClick}>Click me</button>
                <button
                    onClick={() => {
                        this.handleClick();
                    }}
                >
                    Click me
                </button>
            </section>
        );
    }
}
