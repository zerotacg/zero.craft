import React from "react";
import { Nav, NavItem } from "react-bootstrap";

import patterns from "data/pattern/patterns.json!";

export default class Pattern extends React.Component {
    render() {
        var props = this.props;
        var children = patterns.map(this.createNavItem);

        return React.createElement(
            Nav,
            props,
            children
        );
    }

    createNavItem( pattern ) {
        var key = pattern.item;
        var eventKey = key;
        var href = "#" + pattern.item;
        var label = pattern.item;

        return React.createElement(
            NavItem,
            { key, eventKey, href },
            label
        );
    }
}

Pattern.propTypes = {};

Pattern.defaultProps = {
    bsStyle: "pills"
};
