import React from "react";
import ReactDOM from "react-dom";
import Pattern from "zero/component/pattern/pattern";
import Patterns from "zero/data/pattern/patterns.json!";

var pattern = Patterns.filter(pattern => pattern._id === "magic-amplifier-basic-quality")[0];
var main = React.createElement(Pattern, pattern, [
    [
        {
            sheet: "perfling-choice",
            quality: 250,
            quantity: 2
        },
        {
            sheet: "oath-fine",
            quality: 250,
            quantity: 1
        }
    ],
    [
        {
            sheet: "dzao-fine",
            quality: 250,
            quantity: 3
        },
        {
            sheet: "anete-basic",
            quality: 250,
            quantity: 2
        }
    ],
    [
        {
            sheet: "zun-excellent",
            quality: 250,
            quantity: 10
        }
    ]
]);

ReactDOM.render(main, document.getElementById("viewport"));
