import { expect } from "chai";
import jspm from "jspm";

var System = jspm.Loader();

describe("zero.craft", function () {
    var craft;
    var prepare;

    before("imports", function (done) {
        var imports = [
            "zero/craft"
        ];
        Promise.all(imports.map(path => System.import(path)))
            .then(modules => {
                craft = modules[0].craft;
                prepare = modules[0].prepare;
            })
            .then(done, done);
    });

    var mat;
    beforeEach("setup", function () {
        mat = {stats: {0: 20, 1: 0, 3: 60}};
    });

    describe("#prepare()", function () {
        it("should copy all attributes", function () {
            var type = "mat type";
            var result = prepare({type: type, stats: {}});
            expect(result).to.have.property("type", type);
        });

        it("should convert stats into an array", function () {
            var result = prepare(mat);
            expect(result).to.have.property("stats").that.is.an("array");
            expect(result.stats).to.deep.equal([0.2, 0, 0, 0.6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        });

        it("should set used stats as an array", function () {
            var result = prepare(mat);
            expect(result).to.have.property("used").that.is.an("array");
            expect(result.used).to.deep.equal([1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        });
    });

    describe("#craft", function () {
        var mats;
        beforeEach("setup", function () {
            mats = [
                prepare(mat),
                prepare({ stats: { 0: 60, 2: 20, 3: 0 } }),
                prepare({ stats: { 0:  0, 1: 60, 3: 20 } })
            ];
        });
        it("should return an array", function () {
            expect(craft(mats)).to.be.an("array");
        });

        it("should return the resulting stats", function () {
            var result = craft(mats);
            expect(result).to.have.length(34);
            var delta = 0.0001;

            expect(result[0]).to.be.closeTo(0.275, delta);
            expect(result[1]).to.be.closeTo(0.3416, delta);
            expect(result[2]).to.be.closeTo(0.1416, delta);
            expect(result[3]).to.be.closeTo(0.275, delta);
        });
    });
});
