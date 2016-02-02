import Rx from "rx";

export default class {
    constructor(config) {
        Object.assign(this, config);

        this._workers = [];
        this.workers = new Rx.Subject();
        this.add = Rx.Observer.create(this._add.bind(this));
    }

    _add() {
        var worker = { state: "idle" };
        this._workers.push(worker);
        this.workers.onNext(this._workers);
    }

    createWorker() {
        var worker = new Worker("src/worker/echo.js");

        var observer = Rx.Observer.create(
            function (data) {
                worker.postMessage(data);
            });

        var observable = Rx.Observable.create(function (observer) {
            worker.onmessage = function (data) {
                observer.onNext(data);
            };

            worker.onerror = function (err) {
                observer.onError(err);
            };

            return function () {
                worker.close();
            };
        });

        return Rx.Subject.create(observer, observable);
    }
}
