import React from "react";
import ReactDOM from "react-dom";

import Controller from "zero/controller/worker";
import Container from "zero/component/worker/container";

var controller = new Controller();
var add = controller.add;
var items = controller.workers;

var worker = React.createElement(Container, { add, items });

ReactDOM.render(worker, document.getElementById("worker"));
