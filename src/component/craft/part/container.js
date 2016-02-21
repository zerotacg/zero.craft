import React from "react";

import Part from "zero/component/craft/part/part";

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
        var children = props.children;
        this.subscription = children.subject.subscribeOnNext(this.setChildren, this);
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
        var props = this.props;
        var component = props.component;
        var type = props.type;
        var children = this.state.children;

        return React.createElement(
            component,
            { type },
            children
        );
    }
}

Container.propTypes = {};

Container.defaultProps = {
    component: Part
};
