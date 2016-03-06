import React from "react";

export default class List extends React.Component {
    render() {
        var children = this.props.children.map(this.createItem, this);

        return React.createElement(
            "div",
            null,
            children
        );
    }

    createItem( item, key ) {
        var component = this.props.component;

        return React.createElement(
            component,
            { key },
            item
        );
    }
}

List.propTypes = {
    children: React.PropTypes.array
};

List.defaultProps = {
    children: []
};
