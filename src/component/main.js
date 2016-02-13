import React from "react";
import ReactDOM from "react-dom";

import Preview from "zero/component/preview/preview";


var preview = {
    item: "magic-amplifier-basic-quality"
};
var stats = [
    {type: "durability", value: 0.9}
];

var preview_element = React.createElement(
    Preview,
    preview,
    stats
);

ReactDOM.render(
    preview_element,
    document.getElementById("preview")
);
