import React from "react";

import Icon from "zero/component/item/icon";

export default class Slot extends React.Component {
    render() {
        var item = this.props.children;
        var icon = null;

        if ( item.sheet ) {
            icon = this.createIcon(item);
        }

        return React.createElement(
            "span",
            { className: "item-slot" },
            icon
        );
    }

    createIcon(item) {
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
