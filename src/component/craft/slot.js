import React from "react";

import Item from "zero/component/item";

export default class Slot extends React.Component {
    render() {
        return React.createElement(
            Item,
            this.props.children
        );
    }
}

Slot.propTypes = {};

Slot.defaultProps = {};
