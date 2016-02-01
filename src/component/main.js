import React from "react";
import ReactDOM from "react-dom";
import Pattern from "zero/component/pattern/pattern";
import Patterns from "zero/data/pattern/patterns.json!";

var pattern = Patterns.filter(pattern => pattern._id === "magic-amplifier-basic-quality")[0];
var main = React.createElement(Pattern, pattern, [
    [
        {
            sheet: "choice-perfling",
            quality: 250,
            quantity: 2
        },
        {
            sheet: "fine-oath",
            quality: 250,
            quantity: 1
        },
        {
            sheet: "basic-becker",
            quality: 250,
            quantity: 1
        },
        {
            sheet: "basic-adriel",
            quality: 250,
            quantity: 1
        }
    ],
    [
        {
            sheet: "fine-dzao",
            quality: 250,
            quantity: 3
        },
        {
            sheet: "basic-anete",
            quality: 250,
            quantity: 2
        }
    ],
    [
        {
            sheet: "excellent-zun",
            quality: 250,
            quantity: 10
        }
    ]
]);

ReactDOM.render(main, document.getElementById("viewport"));
