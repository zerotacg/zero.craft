import { expect, default as chai } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import jspm from "jspm";

chai.use(sinonChai);

var System = jspm.Loader();

describe("zero.contoller.craft", function () {
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

    var craft;
    beforeEach("setup", function () {
        craft = new Craft();
    });

    describe("#pattern", function () {
        it("should be an Observable", function () {
            expect(craft.pattern).to.be.an.instanceOf(Rx.Observable);
        });
    });

    describe("#parts", function () {
        it("should be an Observable", function () {
            expect(craft.parts).to.be.an.instanceOf(Rx.Observable);
        });
    });

    describe("#createNextParts()", function () {
        var pattern;
        var parts;
        beforeEach("setup", function () {
            parts = [];
            pattern = {
                parts: parts
            };
        });

        it("should return an Array", function () {
            expect(craft.createNextParts(pattern)).to.be.an("array");
        });

        it("should create parts", function () {
            parts[0] = "part 1";
            parts[1] = "part 2";
            sinon.stub(craft, "createPart");

            craft.createNextParts(pattern);
            expect(craft.createPart).to.have.been.calledWith(parts[0]);
            expect(craft.createPart).to.have.been.calledWith(parts[1]);
        });
    });
});
