import React from "react";
import {Button, Glyphicon } from "react-bootstrap";

export default class Worker extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var text = this.getText();
        var play_pause = this.createPlayPauseButton( this.props.state );
        var stop = this.createStopButton();

        return React.createElement(
            "div",
            null,
            text,
            play_pause,
            stop
        );
    }

    getText() {
        var props = this.props;
        var name = props.name;
        var state = props.state;

        return `${name} (${state})`;
    }

    createPlayPauseButton(state) {
        var glyph = state === "paused" ? "play" : "pause";

        return React.createElement(
            Button,
            { bsSize: "xsmall" },
            React.createElement(
                Glyphicon,
                {glyph}
            )
        );
    }

    createStopButton() {
        return React.createElement(
            Button,
            { bsSize: "xsmall" },
            React.createElement(
                Glyphicon,
                {glyph: "stop"}
            )
        );
    }
}

Worker.propTypes = {
};

Worker.defaultProps = {
};
