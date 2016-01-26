import { expect, default as chai } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import jspm from "jspm";

chai.use(sinonChai);

var System = jspm.Loader();

describe("zero.genetic", function () {
    var Factory;
    before("imports", function (done) {
        var imports = [
            "zero/genetic/Factory"
        ];
        Promise.all(imports.map(path => System.import(path)))
            .then(modules => {
                Factory = modules[0].default;
            })
            .then(done, done);
    });


    var factory;
    beforeEach("setup", function () {
        var gene_pool = [
            [1, 2, 3],
            [true, false],
            ["a"]
        ];
        factory = new Factory({gene_pool});
    });

    describe("#population()", function () {
        it("should create random genes of given count", function () {
            var seed = sinon.stub(factory, "seed");
            seed.onCall(0).returns("a");
            seed.onCall(1).returns("b");
            seed.returns("c");

            expect(factory.population(3)).to.deep.equal(["a","b","c"]);
        });
    });

    describe("#seed()", function () {
        it("should return a random genome", function () {
            var random = sinon.stub(factory, "randomValue");
            random.onCall(0).returns(3);
            random.onCall(1).returns(false);
            random.returns("a");
            expect(factory.seed()).to.deep.equal([3, false, "a"]);
        });
    });
});
