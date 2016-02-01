import React from "react";
import Materials from "zero/data/materials.json!";

export default class Item extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var props = this.props;
        var sheet = this.getSheet(props.sheet);
        var children = sheet.icon.texture.map(this.createTexture);
        if ( sheet.icon.text ) {
            children.push( this.createText(sheet.icon.text, "text") );
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

    getSheet(sheet) {
        return Materials.filter(material => material._id === sheet)[0];
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
            { key, className: key + " text-capitalize" },
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
