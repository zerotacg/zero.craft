import React from "react";
import ReactDOM from "react-dom";
import Pattern from "zero/component/pattern/pattern";
import Patterns from "zero/data/pattern/patterns.json!";

var pattern = Patterns.filter(pattern => pattern._id === "magic-amplifier-basic-quality")[0];
console.log("pattern", pattern);
var main = React.createElement(Pattern, pattern, [
    [
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
    ],
    [],
    []
]);

ReactDOM.render(main, document.getElementById("viewport"));
