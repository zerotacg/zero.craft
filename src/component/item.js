import React from "react";

export default class Item extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var props = this.props;
        var children = props.textures.map(this.createTexture);
        if ( props.text ) {
            children.push( this.createText(props.text, "text") );
        }
        if ( props.quality ) {
            children.push( this.createText(props.quality, "quality") );
        }
        if ( props.quantity ) {
            children.push( this.createText(props.quantity, "quantity") );
        }

        return React.createElement(
            "div",
            {
                className: "sitem"
            },
            children
        );
    }

    createTexture(texture, key) {
        return React.createElement(
            "div",
            {
                key,
                className: "texture " + texture
            }
        );
    }

    createText(text, key) {
        return React.createElement(
            "span",
            { key, className: key },
            text
        );
    }
}

Item.propTypes = {
    textures: React.PropTypes.arrayOf(React.PropTypes.string),
    text: React.PropTypes.string,
    quality: React.PropTypes.number,
    quantity: React.PropTypes.number
};

Item.defaultProps = {
    textures: []
};
