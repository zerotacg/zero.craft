import React from "react";

import Item from "zero/component/item";

export default class Select extends React.Component {
    constructor(props) {
        super(props);

        this.createItem = this.createItem.bind(this);
        this.handleClick = this.handleClick.bind(this);
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
        var eventKey = item.sheet;
        var onClick = this.handleClick;

        return React.createElement(
            Item,
            Object.assign({ key, eventKey, onClick }, item)
        );
    }

    handleClick() {
        var selected = this.props.selected;
        selected.onNext(arguments);
    }
}

Select.propTypes = {
};

Select.defaultProps = {
};
