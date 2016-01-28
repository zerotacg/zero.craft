import { expect } from "chai";
import jspm from "jspm";

var System = jspm.Loader();

describe("zero.brute_force", function () {
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
            var current = [[0,0],[0,0]];
            var possibilities = [
                ["a","b"],
                [1,2,3]
            ];
            var search = new Search({
                current, possibilities
            });

            expect(search.next()).to.deep.equal([ "b", "a", 1, 1 ]);
            expect(search.next()).to.deep.equal([ "b", "b", 1, 1 ]);
            expect(search.next()).to.deep.equal([ "a", "a", 2, 1 ]);
            expect(search.next()).to.deep.equal([ "b", "a", 2, 1 ]);
        });
    });
});
