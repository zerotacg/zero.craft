import React from "react";
import ReactDOM from "react-dom";

import WorkerController from "zero/controller/worker";
import SearchController from "zero/controller/search";
import Container from "zero/component/worker/container";
import Search from "zero/brute_force";

var controller = window.worker_controller = new WorkerController();
var items = controller.workers;

var possibilities = [[1,2,3,4,5,6,7,8,9,0,1,2,3,4,5],[1,2,3,4,5,6,7,8,9,0,1,2]];
var search = new Search({possibilities, current: [[-1, 0, 0, 0, 0], [0, 0, 0, 0, 0]]});
window.search_controller = new SearchController({ workers: items, search });

var worker = React.createElement(Container, { items });
ReactDOM.render(worker, document.getElementById("worker"));
