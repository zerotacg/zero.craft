import React from "react";
import {Button, Glyphicon } from "react-bootstrap";

export default class Worker extends React.Component {
    constructor(props) {
        super(props);

        this.state = { state: "unknown" };
    }

    componentDidMount()
    {
        var state = this.props.state;
        if ( state )
        {
            this.subscription = state.subscribeOnNext( this.setWorkerState, this );
        }
    }

    setWorkerState(state) {
        this.setState({ state });
    }

    componentWillUnmount()
    {
        if ( this.subscription )
        {
            this.subscription.dispose();
            this.subscription = undefined;
        }
    }

    render() {
        var text = this.getText();

        return React.createElement(
            "div",
            null,
            text
        );
    }

    getText() {
        var name = this.props.name;
        var state = this.state.state;

        return `${name} (${state})`;
    }
}

Worker.propTypes = {
};

Worker.defaultProps = {
};
