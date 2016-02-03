import Rx from "rx";

const MINIMUM_WORKERS = 1;

export default class {
    constructor(config) {
        Object.assign(this, config);

        this.workers = new Rx.BehaviorSubject([{state: "idle"},{state: "busy"}]);
        this.inc = Rx.Observer.create(this.increase.bind(this));
        this.remove = Rx.Observer.create(this.removeWorker.bind(this));
    }

    increase() {
        var worker = {state: "idle"};
        var workers = this.workers;
        workers.onNext(workers.getValue().concat([worker]));
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

    removeWorker( index ) {
        var workers = this.workers;
        var new_workers = workers.getValue().slice();
        new_workers.splice( index, 1 );
        workers.onNext(new_workers);
    }
}
