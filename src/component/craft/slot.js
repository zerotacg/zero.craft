import React from "react";

export class Empty extends React.Component {
    render() {
        return React.createElement(
            "div",
            { className: "sitem texture w_slot_item" }
        );
    }
}

Empty.propTypes = {};

Empty.defaultProps = {};
