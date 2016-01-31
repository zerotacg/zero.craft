import React from "react";
import ReactDOM from "react-dom";
import Part from "zero/component/pattern/part";

import "bootstrap/css/bootstrap.css!";

var main = React.createElement(Part, { type: "shaft", max: 5 }, [
    {
        textures: ["BK_generic", "mp_bark", "PW_light"],
        text: "Oath",
        quality: 250,
        quantity: 2
    },
    {
        textures: ["BK_generic", "mp_bark", "PW_medium"],
        text: "Oath",
        quality: 250,
        quantity: 1
    }
]);
ReactDOM.render(main, document.getElementById("viewport"));
