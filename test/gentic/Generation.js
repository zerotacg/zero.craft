import { expect, default as chai } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import jspm from "jspm";

chai.use(sinonChai);

var System = jspm.Loader();

describe("zero.genetic", function () {
    var Generation;
    before("imports", function (done) {
        var imports = [
            "zero/genetic/Generation"
        ];
        Promise.all(imports.map(path => System.import(path)))
            .then(modules => {
                Generation = modules[0].default;
            })
            .then(done, done);
    });


    var fitness;
    var population;
    var generation;
    beforeEach("setup", function () {
        fitness = sinon.stub();
        population = ["a", "b", "c"];
        generation = new Generation({population, fitness});
    });

    describe("#rank()", function () {
        it("should sort the population according to fitness", function () {
            fitness.withArgs("a").returns(1);
            fitness.withArgs("b").returns(2);
            fitness.withArgs("c").returns(3);

            expect(generation.rank()).to.deep.equal(["c", "b", "a"]);
        });
    });

    describe("#mutate()", function () {
        it("should randomize the genome according to mutation rate", function () {
            var random = sinon.stub(generation, "random");
            var randomValue = sinon.stub(generation, "randomValue");
            generation.mutation_rate = 0.1;
            generation.gene_pool = ["x", "y", "z"];

            random.onCall(0).returns(0);
            random.onCall(1).returns(0.1);
            random.returns(1);
            randomValue.onCall(0).returns("b");
            randomValue.returns("c");

            expect(generation.mutate([1, 2, 3])).to.deep.equal([1, "b", "c"]);
            expect(randomValue.firstCall).to.have.been.calledWith("y");
            expect(randomValue.secondCall).to.have.been.calledWith("z");
        });
    });

    describe("#crossover()", function () {
        it("should randomize the genome between 2 spouses", function () {
            var randomValue = sinon.stub(generation, "randomValue");

            var a = [1, 2];
            var b = ["a", "b"];
            randomValue.onCall(0).returns("x");
            randomValue.returns("y");

            expect(generation.crossover(a, b)).to.deep.equal(["x", "y"]);
            expect(randomValue.firstCall).to.have.been.calledWith([1, "a"]);
            expect(randomValue.secondCall).to.have.been.calledWith([2, "b"]);
        });
    });
});
