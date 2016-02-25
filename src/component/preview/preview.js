import React from "react";
import Item from "zero/component/item";
import Stat from "zero/component/preview/stat";

export default class Preview extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var props = this.props;
        var header = this.createHeader();
        var item = this.createItem(props.item);
        var stats = props.children.map(this.createStat);

        return React.createElement(
            "div",
            null,
            header,
            item,
            stats
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

    createStat(stat){
        return React.createElement(
            Stat,
            Object.assign({key: stat.type}, stat)
        );
    }
}

Preview.propTypes = {
};

Preview.defaultProps = {
};
