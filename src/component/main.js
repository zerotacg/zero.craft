import React from "react";
import ReactDOM from "react-dom";

import Controller from "zero/controller/worker";
import Container from "zero/component/worker/container";

var controller = window.controller = new Controller();
var add = controller.inc;
var remove = controller.remove;
var items = controller.workers;

var worker = React.createElement(Container, { add, items });

ReactDOM.render(worker, document.getElementById("worker"));
