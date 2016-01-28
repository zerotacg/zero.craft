import { expect, default as chai } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import jspm from "jspm";

chai.use(sinonChai);

var System = jspm.Loader();

describe("zero.combination", function () {
    var Iterator;
    before("imports", function (done) {
        var imports = [
            "zero/combination/iterator"
        ];
        Promise.all(imports.map(path => System.import(path)))
            .then(modules => {
                Iterator = modules[0].default;
            })
            .then(done, done);
    });


    var iterator;
    beforeEach("setup", function () {
        iterator = new Iterator({k: 3, n: 5});
    });

    describe("#constructor()", function () {
        context("when no current is given", function () {
            it("should create a starting point", function () {
                expect(iterator).to.have.property("current").that.deep.equals([0,0,0]);
            });
        });
        context("when a current is given", function () {
            it("should adjust the size of given current", function () {
                expectCurrent([1,2]).to.deep.equals([1,2,0]);
                expectCurrent([1,2,3]).to.deep.equals([1,2,3]);
                expectCurrent([1,2,3,4]).to.deep.equals([1,2,3]);
            });

            function expectCurrent(current) {
                iterator = new Iterator({k: 3, n: 5, current});
                return expect(iterator.current);
            }
        });
    });

    describe("#next()", function () {
        it("should k combinations", function () {
            expect(iterator.next()).to.deep.equal([1,0,0]);
            expect(iterator.next()).to.deep.equal([2,0,0]);
            expect(iterator.next()).to.deep.equal([3,0,0]);
            expect(iterator.next()).to.deep.equal([4,0,0]);
            expect(iterator.next()).to.deep.equal([1,1,0]);
            expect(iterator.next()).to.deep.equal([2,1,0]);
            expect(iterator.next()).to.deep.equal([3,1,0]);
            expect(iterator.next()).to.deep.equal([4,1,0]);
        });
    });
});
