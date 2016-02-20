import React from "react";
import materials from "zero/data/sitems.json!";

export default class Item extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var props = this.props;
        var item = props.children;
        var sheet = this.getSheet(item.sheet);
        var children = sheet.icon.texture.map(this.createTexture);
        if ( sheet.icon.text ) {
            children.push( this.createText(sheet.icon.text, "text") );
        }
        if ( sheet.quality ) {
            children.push( this.createText(sheet.quality, "quality") );
        }
        if ( item.count ) {
            children.push( this.createText(item.count, "quantity") );
        }

        return React.createElement(
            "div",
            Object.assign({
                className: "sitem"
            }, props),
            children
        );
    }

    getSheet(sheet) {
        return materials.filter(material => material._id === sheet)[0];
    }

    createTexture(texture, key) {
        return React.createElement(
            "div",
            { key, className: `texture ${texture}` }
        );
    }

    createText(text, key) {
        return React.createElement(
            "span",
            { key, className: `${key} text-capitalize` },
            text
        );
    }
}

Item.propTypes = {
    sheet: React.PropTypes.string,
    text: React.PropTypes.string,
    quality: React.PropTypes.number,
    quantity: React.PropTypes.number
};

Item.defaultProps = {
};
