import React from "react";
import Rx from "rx";

import AbstractContainer from "zero/component/container";
import List from "zero/component/list/list";

export default class Container extends AbstractContainer {
    constructor( props ) {
        super(props);

        this.state = {
            children: []
        };
    }

    subscribe(props) {
        var children = props.children;
        this.subscription = children.subscribeOnNext(this.setChildren, this);
    }

    setChildren( children ) {
        this.setState({ children });
    }

    render() {
        var children = this.state.children;

        return React.createElement(
            List,
            this.props,
            children
        );
    }
}

Container.propTypes = {
    children: React.PropTypes.instanceOf(Rx.Observable)
};

Container.defaultProps = {
};
