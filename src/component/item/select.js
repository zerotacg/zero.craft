import React from "react";

import Item from "zero/component/item";

export default class Select extends React.Component {
    constructor(props) {
        super(props);

        this.createItem = this.createItem.bind(this);
    }

    render() {
        var children = this.props.children.map(this.createItem);

        return React.createElement(
            "div",
            null,
            children
        );
    }

    createItem(item, key) {
        var selected = this.props.selected;
        var sheet = item.sheet;

        return React.createElement(
            Item,
            { key, onClick: () => selected.onNext(sheet) },
            item
        );
    }
}

Select.propTypes = {
};

Select.defaultProps = {
};
