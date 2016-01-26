import { expect, default as chai } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import jspm from "jspm";

chai.use(sinonChai);

var System = jspm.Loader();

describe("zero.genetic.Math", function () {
    var Math;
    before("imports", function (done) {
        var imports = [
            "zero/genetic/Math"
        ];
        Promise.all(imports.map(path => System.import(path)))
            .then(modules => {
                Math = modules[0];
            })
            .then(done, done);
    });

    describe(".randomValue", function () {
        it("should return a number between inclusive 0 and exclusive length", function () {
            expect(Math.randomValue(["a", "a"])).to.equal("a");
        });
    });

    describe(".randomIndex", function () {
        it("should return a number between inclusive 0 and exclusive length", function () {
            expect(Math.randomIndex(10)).to.be.an("number");
        });
    });
});
