import React from "react";
import { Row, Col } from "react-bootstrap";

import Part from "zero/component/pattern/part";

export default class Pattern extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var props = this.props;
        var parts = props.parts.map(this.createPart.bind(this));
        return React.createElement(
            "div",
            null,
            parts
        );
    }

    createPart( part, key ) {
        var props = this.props;
        var children = props.children[key];
        return React.createElement(
            Part,
            Object.assign({key}, part),
            children
        );
    }
}

Pattern.propTypes = {
};

Pattern.defaultProps = {
};
