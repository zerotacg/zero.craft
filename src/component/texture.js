import React from "react";

export default class Texture extends React.Component {
    render() {
        var texture = this.props.children;
        return React.createElement(
            "div",
            { className: `texture ${texture}` }
        );
    }
}

Texture.propTypes = {
    children: React.PropTypes.string
};

Texture.defaultProps = {
};
