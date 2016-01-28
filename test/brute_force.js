import { expect } from "chai";
import jspm from "jspm";

var System = jspm.Loader();

describe("zero.craft", function () {
    var Search;

    before("imports", function (done) {
        var imports = [
            "zero/brute_force"
        ];
        Promise.all(imports.map(path => System.import(path)))
            .then(modules => {
                Search = modules[0].default;
            })
            .then(done, done);
    });

    describe("#next", function () {
        it("should return an array", function () {
            var current = [0,0];
            var possibilities = [
                ["a","b"],
                [1,2,3]
            ];
            var search = new Search({
                current, possibilities
            });

            expect(search.next()).to.deep.equal(["a",1]);
            expect(search.next()).to.deep.equal(["b",1]);
            expect(search.next()).to.deep.equal(["a",2]);
            expect(search.next()).to.deep.equal(["b",2]);
            expect(search.next()).to.deep.equal(["a",3]);
        });
    });
});
