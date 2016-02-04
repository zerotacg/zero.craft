import React from "react";

import List from "zero/component/worker/list";

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {children: []};
    }

    componentDidMount()
    {
        var items = this.props.items;
        if ( items )
        {
            this.subscription = items.subscribeOnNext( this.setItems, this );
        }
    }

    setItems(children) {
        this.setState({ children });
    }

    componentWillUnmount()
    {
        if ( this.subscription )
        {
            this.subscription.dispose();
            this.subscription = undefined;
        }
    }

    render() {
        return React.createElement(
            List,
            null,
            this.state.children
        );
    }
}
