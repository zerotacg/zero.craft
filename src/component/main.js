import React from "react";
import ReactDOM from "react-dom";
import Pattern from "zero/component/pattern/pattern";
import Preview from "zero/component/preview/preview";
import Patterns from "zero/data/pattern/patterns.json!";

var pattern = Patterns.filter(pattern => pattern.item === "magic-amplifier-basic-quality")[0];
var pattern_element = React.createElement(Pattern, pattern, [
    [
        {
            sheet: "choice-perfling",
            quantity: 2
        },
        {
            sheet: "fine-oath",
            quantity: 1
        },
        {
            sheet: "basic-becker",
            quantity: 1
        },
        {
            sheet: "basic-adriel",
            quantity: 1
        }
    ],
    [
        {
            sheet: "fine-dzao",
            quantity: 3
        },
        {
            sheet: "basic-anete",
            quantity: 2
        }
    ],
    [
        {
            sheet: "excellent-zun",
            quantity: 10
        }
    ]
]);

ReactDOM.render(pattern_element, document.getElementById("pattern"));

var preview = React.createElement(Preview, {pattern});
ReactDOM.render(preview, document.getElementById("preview"));
