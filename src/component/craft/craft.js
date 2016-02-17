import React from "react";

import Part from "zero/component/craft/part";

export default class Craft extends React.Component {
    render() {
        var children = this.props.children.map(this.createPart);

        return React.createElement(
            "div",
            null,
            children
        );
    }

    createPart({ type, items }) {
        return React.createElement(
            Part,
            { key: type, type },
            items
        );
    }
}

Craft.propTypes = {};

Craft.defaultProps = {};
