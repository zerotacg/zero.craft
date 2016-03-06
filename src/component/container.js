import React from "react";

export default class Container extends React.Component {
    componentWillMount() {
        this.subscribe(this.props);
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
}

Container.propTypes = {};

Container.defaultProps = {};
