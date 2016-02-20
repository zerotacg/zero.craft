import React from "react";
import materials from "zero/data/sitems.json!";

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
        if ( sheet.quality ) {
            children.push( this.createText(sheet.quality, "quality") );
        }
        if ( props.count ) {
            children.push( this.createText(props.count, "quantity") );
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
        return materials.filter(material => material._id === sheet)[0];
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
