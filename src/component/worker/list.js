import React from "react";
import {Button, Glyphicon } from "react-bootstrap";

import Worker from "zero/component/worker/worker";

export default class List extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var props = this.props;
        var children = props.children.map(this.createWorker);

        return React.createElement(
            "div",
            null,
            children
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
