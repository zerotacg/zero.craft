import React from "react";
import ReactDOM from "react-dom";
import Rx from "rx";

import Nav from "zero/component/nav/pattern/container";
import Hash from "zero/history/hash";

var hash = window.hash = Hash.create();
var activeKey = window.activeKey = hash;

var nav = React.createElement(
    Nav,
    { activeKey },
    null
);

ReactDOM.render(
    nav,
    document.getElementById("patterns")
);
