import React from "react";
import ReactDOM from "react-dom";
import Rx from "rx";

import Nav from "zero/component/nav/pattern/container";
import CraftContainer from "zero/component/craft/container";
import Select from "zero/component/item/select";
import CraftController from "zero/controller/craft";

var hash = window.hash = Rx.Observable.fromEventPattern(
        handler => window.addEventListener("hashchange", handler),
        handler => window.removeEventListener("hashchange", handler)
    )
    .map(event => event.newURL)
    .startWith(location.hash)
    .map(url => url.split("#")[1])
;
var activeKey = hash;
var pattern = hash;
var selected = window.selected = new Rx.Subject();
var craft_controller = window.craft_controller = CraftController.create();
pattern.subscribeOnNext( craft_controller.setPattern, craft_controller );

var nav = React.createElement(
    Nav,
    { activeKey },
    null
);

var craft = React.createElement(
    CraftContainer,
    null,
    craft_controller.pattern
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
