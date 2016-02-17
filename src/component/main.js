import React from "react";
import ReactDOM from "react-dom";
import Rx from "rx";

import Nav from "zero/component/nav/pattern/container";
import Craft from "zero/component/craft/craft";

var activeKey = window.activeKey = new Rx.Subject();

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
            items: [
                { count: 1, sheet: "basic-adriel" },
                { count: 1, sheet: "basic-becker" },
                { count: 1, sheet: "fine-oath" },
                { count: 2, sheet: "choice-perfling" }
            ]
        },
        {
            type: "grip",
            items: [
                { count: 2, sheet: "basic-anete" },
                { count: 3, sheet: "fine-dzao" }
            ]
        },
        {
            type: "magic-focus",
            items: [
                { count: 10, sheet: "excellent-zun" }
            ]
        }
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
