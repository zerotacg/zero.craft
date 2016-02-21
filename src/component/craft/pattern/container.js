import React from "react";

import Pattern from "zero/component/craft/pattern/pattern";

export default class Container extends React.Component {
    constructor( props ) {
        super(props);

        this.state = {
            children: []
        };
    }

    componentWillMount() {
        this.subscribe(this.props);
    }

    subscribe(props) {
        var controller = props.controller;
        this.subscription = controller.subject.pluck("parts").subscribeOnNext(this.setChildren, this);
    }

    setChildren( children ) {
        this.setState({ children });
    }

    componentWillUnmount() {
        this.dispose();
    }

    dispose() {
        if ( this.subscription ) {
            this.subscription.dispose();
            this.subscription = undefined;
        }
    }

    componentWillReceiveProps( props ) {
        this.dispose();
        this.subscribe(props);
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
