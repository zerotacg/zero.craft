import React from "react";

import Part from "zero/component/craft/part/container";

export default class Pattern extends React.Component {
    render() {
        var children = this.props.children.map(this.createPart);

        return React.createElement(
            "div",
            null,
            children
        );
    }

    createPart(part) {
        var type = part.type;

        return React.createElement(
            Part,
            { key: type, type, part }
        );
    }
}

Pattern.propTypes = {};

Pattern.defaultProps = {};
