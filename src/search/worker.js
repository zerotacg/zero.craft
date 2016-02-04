import Rx from "rx";

const STATE_IDLE = "idle";
const MESSAGE_STATE = "state";

export default class {
    static create() {
        var worker = new Worker("src/worker/craft.js");

        var observer = Rx.Observer.create(
            function (data) {
                worker.postMessage(data);
            });

        var observable = Rx.Observable.create(function (observer) {
            worker.onmessage = function(e) {
                observer.onNext(e.data);
            };

            worker.onerror = function (err) {
                observer.onError(err);
            };

            return function () {
                worker.close();
            };
        }).publish().refCount();

        var subject = Rx.Subject.create(observer, observable);
        var state = subject.filter(message => message.type === MESSAGE_STATE).map(message => message.data).startWith(STATE_IDLE);
        subject.subscribeOnNext(message => console.log("worker", "message", message));
        state.subscribeOnNext(state => console.log("worker", "state", state));

        return new this({subject, state});
    }

    constructor(config) {
        Object.assign(this, config);
    }

    craft(message) {
        this.subject.onNext(message);
    }
}