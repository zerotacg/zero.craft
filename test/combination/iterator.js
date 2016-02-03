import { expect } from "chai";
import jspm from "jspm";

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
        iterator = new Iterator({k: 3, n: 5, current: [0,0,0]});
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
            expect(iterator.next()).to.deep.equal([2,2,0]);
            expect(iterator.next()).to.deep.equal([3,2,0]);
            expect(iterator.next()).to.deep.equal([4,2,0]);
            expect(iterator.next()).to.deep.equal([3,3,0]);
            expect(iterator.next()).to.deep.equal([4,3,0]);
            expect(iterator.next()).to.deep.equal([4,4,0]);
            expect(iterator.next()).to.deep.equal([1,1,1]);
            expect(iterator.next()).to.deep.equal([2,1,1]);
            expect(iterator.next()).to.deep.equal([3,1,1]);
            expect(iterator.next()).to.deep.equal([4,1,1]);
            expect(iterator.next()).to.deep.equal([2,2,1]);
            expect(iterator.next()).to.deep.equal([3,2,1]);
            expect(iterator.next()).to.deep.equal([4,2,1]);
            expect(iterator.next()).to.deep.equal([3,3,1]);
            expect(iterator.next()).to.deep.equal([4,3,1]);
            expect(iterator.next()).to.deep.equal([4,4,1]);
            expect(iterator.next()).to.deep.equal([2,2,2]);
            expect(iterator.next()).to.deep.equal([3,2,2]);
            expect(iterator.next()).to.deep.equal([4,2,2]);
            expect(iterator.next()).to.deep.equal([3,3,2]);
            expect(iterator.next()).to.deep.equal([4,3,2]);
            expect(iterator.next()).to.deep.equal([4,4,2]);
            expect(iterator.next()).to.deep.equal([3,3,3]);
            expect(iterator.next()).to.deep.equal([4,3,3]);
            expect(iterator.next()).to.deep.equal([4,4,3]);
            expect(iterator.next(0)).to.deep.equal([4,4,3]);
            expect(iterator.next()).to.deep.equal([4,4,4]);
            expect(iterator.overflow).to.equal(0);
            expect(iterator.next()).to.deep.equal([0,0,0]);
            expect(iterator.overflow).to.equal(1);
        });
    });
});
