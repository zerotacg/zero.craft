import React from "react";
import ReactDOM from "react-dom";

import Nav from "zero/component/nav/pattern/container";
import Pattern from "zero/component/craft/pattern/container";
import List from "zero/component/list/list";
import Slot from "zero/component/item/slot";
import Hash from "zero/history/hash";
import PatternController from "zero/pattern/pattern";

var hash = window.hash = Hash.create();
var activeKey = window.activeKey = hash;
var controller = window.pattern_controller = PatternController.create();
hash.subscribeOnNext( controller.load, controller );

var nav = React.createElement(
    Nav,
    { activeKey },
    null
);

var pattern = React.createElement(
    Pattern,
    { controller },
    null
);

var items = React.createElement(
    List,
    {
        component: Slot
    },
    [
        {
            sheet: "basic-adriel",
            quantity: 1
        },
        {
            sheet: "fine-oath",
            quantity: 2
        },
        {
            sheet: "choice-perfling",
            quantity: 3
        }
    ]
);

ReactDOM.render(
    nav,
    document.getElementById("nav")
);

ReactDOM.render(
    pattern,
    document.getElementById("pattern")
);

ReactDOM.render(
    items,
    document.getElementById("items")
);

