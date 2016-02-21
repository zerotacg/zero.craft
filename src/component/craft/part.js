import React from "react";

import Item from "zero/component/item";
import {Empty} from "zero/component/craft/slot";
import parts from "data/pattern/parts.json!";

export default class Part extends React.Component {
    render() {
        var props = this.props;
        var header = this.createHeader(props.type);
        var children = props.children.map(this.createSlot);

        return React.createElement(
            "div",
            null,
            header,
            children
        );
    }

    createHeader( type ) {
        var part = this.getPart(type);
        var icon = this.createIcon(part);
        var label = this.createLabel(part);

        return React.createElement(
            "div",
            null,
            icon,
            label
        );
    }

    getPart( type ) {
        return parts.filter(part => part._id === type)[ 0 ];
    }

    createIcon( { icon } ) {
        return React.createElement(
            "span",
            { className: `texture ${icon}` }
        );
    }

    createLabel( { label } ) {
        return React.createElement(
            "span",
            null,
            label
        );
    }

    createSlot( item, key ) {
        var component = Empty;

        if ( item ) {
            component = Item;
        }

        return React.createElement(
            component,
            { key },
            item
        );
    }
}

Part.propTypes = {};

Part.defaultProps = {};
