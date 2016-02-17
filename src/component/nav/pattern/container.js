import React from "react";

import Pattern from "zero/component/nav/pattern/pattern";

export default class Container extends React.Component {
    constructor( props ) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        var activeKey = this.props.activeKey;
        this.subscription = activeKey.subscribeOnNext(this.setActive, this);
    }

    setActive( activeKey ) {
        this.setState({ activeKey });
    }

    componentWillUnmount() {
        if ( this.subscription ) {
            this.subscription.dispose();
            this.subscription = undefined;
        }
    }

    render() {
        var activeKey = this.state.activeKey;

        return React.createElement(
            Pattern,
            { activeKey }
        );
    }
}

Container.propTypes = {};

Container.defaultProps = {};
