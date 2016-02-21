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
    var pattern;
    var items;
    beforeEach("setup", function () {
        pattern = new Rx.Subject();
        items = new Rx.Subject();
        craft = new Craft({ pattern, items });
    });

    describe("#parts", function () {
        context("when the pattern is changed", function () {
            it("should emit parts", function ( done ) {
                craft.parts.subscribe(next => {
                    expect(next).to.deep.equal([
                        {
                            "type": "shaft",
                            "count": 5,
                            "items": new Array(5).fill(null)
                        },
                        {
                            "type": "grip",
                            "count": 5,
                            "items": new Array(5).fill(null)
                        },
                        {
                            "type": "magic-focus",
                            "count": 10,
                            "items": new Array(10).fill(null)
                        }
                    ]);
                    done();
                }, done);
                pattern.onNext("magic-amplifier-basic-quality");
            });
        });

        context("when items are added", function () {
            it.skip("should add them to the parts", function ( done ) {
                var sheet = "basic-adriel";
                pattern.onNext("magic-amplifier-basic-quality");
                items.onNext({ part: "shaft", sheet });
                craft.parts.subscribe(next => {
                    expect(next).to.deep.equal([
                        {
                            "type": "shaft",
                            "count": 5,
                            "items": [
                                { count: 1, sheet }
                            ]
                        },
                        {
                            "type": "grip",
                            "count": 5,
                            "items": []
                        },
                        {
                            "type": "magic-focus",
                            "count": 10,
                            "items": []
                        }
                    ]);
                    done();
                }, done);
            });
        });
    });

    describe("#createPartItems()", function () {
        it("should filter the items by part", function ( done ) {
            var part = { type: "shaft" };
            var a = { part: "grip", sheet: "a" };
            var b = { part: "shaft", sheet: "b" };
            var items = Rx.Observable.from([ a, b ]);
            craft.createPartItems(part, items).toArray().subscribe(next => {
                expect(next).to.deep.equal([b]);
                done();
            }, done);
        });
    });

    describe("#groupBySheet()", function () {
        var items;
        beforeEach("setup", function () {
            items = Rx.Observable.from([ "a", "b", "b" ]);
        });

        it("should return an Observable", function () {
            expectGroupBySheet().to.be.an.instanceOf(Rx.Observable);
        });

        function expectGroupBySheet() {
            return expect(craft.groupBySheet(items));
        }

        it("should add a count", function ( done ) {
            craft.groupBySheet(items).subscribe(next => {
                expect(next).to.deep.equal([ { count: 1, sheet: "a" }, { count: 2, sheet: "b" } ]);
                done();
            }, done);
        });
    });
});
