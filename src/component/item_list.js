import React from "react";
import { Col } from "react-bootstrap";

import Item from "zero/component/item";

export default class ItemList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var props = this.props;
        var children = props.children.map(this.createItem);

        return React.createElement(
            Col,
            {lg: 12},
            children
        );
    }

    createItem(item, key) {
        return React.createElement(
            Item,
            Object.assign({key}, item)
        );
    }
}

ItemList.propTypes = {
    children: React.PropTypes.arrayOf(React.PropTypes.shape(Item.propTypes))
};

ItemList.defaultProps = {
    children: []
};
