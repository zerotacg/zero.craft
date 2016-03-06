import React from "react";

import Icon from "zero/component/item/icon";

export default class Slot extends React.Component {
    render() {
        var icon = this.createIcon();

        return React.createElement(
            "div",
            { className: "item-slot" },
            icon
        );
    }

    createIcon() {
        var item = this.props.children;

        return React.createElement(
            Icon,
            null,
            item
        );
    }
}

Slot.propTypes = {
};

Slot.defaultProps = {
};
