import React from "react";
import { Row, Col } from "react-bootstrap";

import ItemList from "zero/component/item_list";
import Parts from "zero/data/pattern/parts.json!";

export default class Part extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var header = this.createHeader();
        var count = this.createCount();
        var item_list = this.createItemList();

        return React.createElement(
            Row,
            null,
            header,
            count,
            item_list
        );
    }

    createHeader() {
        var props = this.props;
        var part = Parts[props.type];
        var icon = this.createIcon(part.icon);
        var label = part.label;
        return React.createElement(
            Col,
            { lg: 10 },
            icon,
            label
        );
    }

    createIcon(icon) {
        return React.createElement(
            "span",
            { className: "texture " + icon }
        );
    }

    createCount() {
        var props = this.props;
        var count = props.children.length;
        var max = props.max;

        return React.createElement(
            Col,
            { lg: 2, className: "text-right" },
            `${count}/${max}`
        );
    }

    createItemList() {
        var props = this.props;

        return React.createElement(
            ItemList,
            { max: props.max },
            props.children
        );
    }
}

Part.propTypes = {
    max: React.PropTypes.number,
    children: ItemList.propTypes.children
};

Part.defaultProps = {
};
