import React from "react";

import AbstractContainer from "zero/component/container";
import Pattern from "zero/component/craft/pattern/pattern";

export default class Container extends AbstractContainer {
    constructor( props ) {
        super(props);

        this.state = {
            children: []
        };
    }

    subscribe(props) {
        var controller = props.controller;
        this.subscription = controller.subject.pluck("parts").subscribeOnNext(this.setChildren, this);
    }

    setChildren( children ) {
        this.setState({ children });
    }

    render() {
        var component = this.props.component;
        var children = this.state.children;

        return React.createElement(
            component,
            null,
            children
        );
    }
}

Container.propTypes = {};

Container.defaultProps = {
    component: Pattern
};
