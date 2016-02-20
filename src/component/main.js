import React from "react";
import ReactDOM from "react-dom";
import Rx from "rx";

import Nav from "zero/component/nav/pattern/container";
import Craft from "zero/component/craft/craft";
import Select from "zero/component/item/select";

var activeKey = window.activeKey = new Rx.Subject();
var selected = window.selected = new Rx.Subject();

var nav = React.createElement(
    Nav,
    { activeKey },
    null
);

var craft = React.createElement(
    Craft,
    null,
    [
        {
            type: "shaft",
            count: 5,
            items: [
                { count: 1, sheet: "basic-adriel" },
                { count: 1, sheet: "basic-becker" },
                { count: 1, sheet: "fine-oath" },
                { count: 2, sheet: "choice-perfling" }
            ]
        },
        {
            type: "grip",
            count: 5,
            items: [
                { count: 2, sheet: "basic-anete" },
                { count: 3, sheet: "fine-dzao" }
            ]
        },
        {
            type: "magic-focus",
            count: 10,
            items: [
                { count: 10, sheet: "excellent-zun" }
            ]
        }
    ]
);

var select = React.createElement(
    Select,
    { selected },
    [
        { sheet: "basic-adriel" },
        { sheet: "basic-becker" },
        { sheet: "fine-oath" },
        { sheet: "choice-perfling" }
    ]
);

ReactDOM.render(
    nav,
    document.getElementById("patterns")
);

ReactDOM.render(
    craft,
    document.getElementById("craft")
);

ReactDOM.render(
    select,
    document.getElementById("select")
);
