import React from "react";

import Craft from "zero/component/craft/craft";

export default class Container extends React.Component {
    constructor( props ) {
        super(props);

        this.state = {
            children: []
        };
    }

    componentDidMount() {
        var children = this.props.children;
        this.subscription = children.subscribeOnNext(this.setChildren, this);
    }

    setChildren( children ) {
        this.setState({ children });
    }

    componentWillUnmount() {
        if ( this.subscription ) {
            this.subscription.dispose();
            this.subscription = undefined;
        }
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
    component: Craft
};
