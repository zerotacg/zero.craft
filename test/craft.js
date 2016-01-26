import { expect } from "chai";
import jspm from "jspm";

var System = jspm.Loader();

describe("zero.craft", function () {
    var genome;

    before("imports", function (done) {
        var imports = [
            "zero/craft"
        ];
        Promise.all(imports.map(path => System.import(path)))
            .then(modules => {
                genome = modules[0].genome;
            })
            .then(done, done);
    });

    describe("#genome", function () {
        it("should return an array", function () {
        });
    });
});
