import { expect, default as chai } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import jspm from "jspm";

chai.use(sinonChai);

var System = jspm.Loader();

describe("zero.data.store", function () {
    var Rx;
    var Store;

    before("imports", function ( done ) {
        var imports = [
            "rx",
            "zero/data/store"
        ];
        Promise.all(imports.map(path => System.import(path)))
            .then(modules => {
                Rx = modules[ 0 ];
                Store = modules[ 1 ].default;
            })
            .then(done, done);
    });

    var store;
    beforeEach("setup", function () {
        store = new Store();
    });

    describe("#items", function () {
        it("should be an Observable", function () {
            expect(store.items).to.be.an.instanceOf(Rx.Observable);
        });
    });

    describe("#add()", function () {
        it("should add an item", function () {
            var value = "value";
            store.value = [];
            sinon.stub(store, "onNext");

            store.add(value);
            store.add(value);
            expect(store.onNext).to.have.been.calledWith([value,value]);
        });
    });

    describe("#onNext()", function () {
        it("should push the value to the items observable", function (done) {
            var value = "value";

            store.onNext(value);
            store.items.take(1).subscribe(next => {
                expect(next).to.equal(value);
            }, done, done);
        });
    });

    describe("#remove()", function () {
        it("should remove an item at given index", function () {
            store.value = ["a", "b", "c"];
            sinon.stub(store, "onNext");

            store.remove(1);
            expect(store.onNext).to.have.been.calledWith(["a", "c"]);
        });
    });
});
