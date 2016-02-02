import React from "react";

import List from "zero/component/worker/list";

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {children: []};
        this.add = this.add.bind(this);
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
        var onAddClick = this.add;

        return React.createElement(
            List,
            { onAddClick },
            this.state.children
        );
    }

    add() {
        this.props.add.onNext();
    }
}
