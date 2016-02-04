import React from "react";
import ReactDOM from "react-dom";

import WorkerController from "zero/controller/worker";
import SearchController from "zero/controller/search";
import Container from "zero/component/worker/container";

var controller = window.worker_controller = new WorkerController();
var items = controller.workers;
window.search_controller = new SearchController({ workers: items });

var worker = React.createElement(Container, { items });

ReactDOM.render(worker, document.getElementById("worker"));
