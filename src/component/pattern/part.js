import React from "react";
import { Row, Col } from "react-bootstrap";

import ItemList from "zero/component/item_list";
import Parts from "zero/data/pattern/parts.json!";

function sum(total, value) {
    return total + value;
}

export default class Part extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var quantity = this.getQuantity();

        return React.createElement(
            Row,
            null,
            this.createHeader(),
            this.createCount(quantity),
            this.createItemList()
        );
    }

    getQuantity() {
        return this.props.children.map(item => item.quantity).reduce(sum,0);
    }

    createHeader() {
        var props = this.props;
        var part = Parts[props.type];
        var icon = this.createIcon(part.icon);
        var label = part.label;
        return React.createElement(
            Col,
            {lg: 10},
            icon,
            label
        );
    }

    createIcon(icon) {
        return React.createElement(
            "span",
            {className: "texture " + icon}
        );
    }

    createCount(count) {
        var props = this.props;
        var max = props.count;

        return React.createElement(
            Col,
            {lg: 2, className: "text-right"},
            `${count}/${max}`
        );
    }

    createItemList() {
        var props = this.props;

        return React.createElement(
            ItemList,
            null,
            props.children
        );
    }

    createEmptySlot() {
        return React.createElement(
            "span",
            {key: "empty", className: "texture W_slot_item"}
        );
    }
}

Part.propTypes = {
    type: React.PropTypes.string,
    count: React.PropTypes.number,
    children: ItemList.propTypes.children
};

Part.defaultProps = {};
