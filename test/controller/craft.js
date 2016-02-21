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

    describe("#setPattern()", function () {
        it("should emit a new pattern", function (done) {
            var item = "magic-amplifier-basic-quality";
            var pattern = "pattern";
            sinon.stub(craft.patternFactory, "create").returns(pattern);

            craft.setPattern(item);

            craft.createPatternStream().subscribe(
                next => {
                    expect(craft.patternFactory.create).to.have.been.calledWith(item);
                    expect(next).to.equal(pattern);
                    done();
                },
                done
            );

        });
    });

});
