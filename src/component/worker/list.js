import React from "react";
import {Button, Glyphicon } from "react-bootstrap";

import Worker from "zero/component/worker/worker";

export default class List extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var props = this.props;
        var add_button = this.createAddButton(props.onAddClick);
        var children = props.children.map(this.createWorker);

        return React.createElement(
            "div",
            null,
            add_button,
            children
        );
    }

    createAddButton(onClick) {
        return React.createElement(
            Button,
            {onClick, bsSize: "xsmall"},
            React.createElement(
                Glyphicon,
                {glyph: "asterisk"}
            )
        );
    }

    createWorker(worker, key) {
        var name = `worker ${key}`;

        return React.createElement(
            Worker,
            Object.assign({key, name}, worker)
        );
    }
}

List.propTypes = {};

List.defaultProps = {};
