import React from "react";
import ReactDOM from "react-dom";

import Nav from "zero/component/nav/pattern/container";
import Pattern from "zero/component/craft/pattern/container";
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


ReactDOM.render(
    nav,
    document.getElementById("nav")
);

ReactDOM.render(
    pattern,
    document.getElementById("pattern")
);
