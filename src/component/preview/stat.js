import React from "react";

export default class Stat extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var props = this.props;
        var type = props.type;
        var value = props.value;
        var label = this.createLabel(type);

        return React.createElement(
            "div",
            { className: "stat " + type },
            label,
            value
        );
    }

    createLabel(type) {
        var label = type;

        return React.createElement(
            "span",
            null,
            label
        );
    }
}

Stat.propTypes = {
};

Stat.defaultProps = {
};
