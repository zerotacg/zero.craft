import React from "react";
import Item from "zero/component/item";

export default class Preview extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var props = this.props;
        var pattern = props.pattern;
        var header = this.createHeader();
        var item = this.createItem(pattern.item);

        return React.createElement(
            "div",
            null,
            header,
            item
        );
    }

    createHeader() {
        return React.createElement(
            "h4",
            null,
            "Preview"
        );
    }

    createItem(sheet) {
        return React.createElement(
            Item,
            { sheet }
        );
    }
}

Preview.propTypes = {
};

Preview.defaultProps = {
};

//<h4>Preview</h4>
//<div class="sitem">
//    <div class="texture bk_zorai"></div>
//    <div class="texture mg_glove"></div>
//    <span class="quality">160</span>
//    </div>
//    <div class="stats">
//    <div class="row">
//    <div class="col-lg-6">Durability</div>
//    <div class="col-lg-5">
//    <div class="texture W_slot_jauge_1"></div>
//    </div>
//    <div class="col-lg-1">100/100</div>
//    </div>
//    <div class="row">
//    <div class="col-lg-6">Adversary Dodge Modifier</div>
//<div class="col-lg-5">
//    <div class="texture W_slot_jauge_1"></div>
//    </div>
//    <div class="col-lg-1">63/100</div>
//    </div>
//    </div>
