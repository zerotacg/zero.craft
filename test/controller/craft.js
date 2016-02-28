/* jshint expr: true */

import { expect } from "chai";
import jspm from "jspm";

var System = jspm.Loader();

describe("zero.controller.craft", function () {
    var Rx;
    var Craft;

    before("imports", function ( done ) {
        var imports = [
            "rx",
            "zero/controller/craft"
        ];
        Promise.all(imports.map(path => System.import(path)))
            .then(modules => {
                Rx = modules[ 0 ];
                Craft = modules[ 1 ].default;
            })
            .then(done, done);
    });

    it("should exist", function () {
        expect(Craft).to.be.ok;
    });
});
