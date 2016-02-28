import Rx from "rx";

const STATE_STARTING = "starting";
const MESSAGE_STATE = "state";
const MESSAGE_RESULT = "result";

export default class {
    static create() {
        var worker = new Worker("src/worker/craft/main.js");

        var observer = Rx.Observer.create(
            (data) => {
                worker.postMessage(data);
            });

        var observable = Rx.Observable.create(observer => {
            worker.onmessage = function(e) {
                observer.onNext(e.data);
            };

            worker.onerror = function (err) {
                observer.onError(err);
            };
        }).publish().refCount();

        var subject = Rx.Subject.create(observer, observable);
        var state = subject.filter(message => message.type === MESSAGE_STATE).map(message => message.data).startWith(STATE_STARTING);
        var result = subject.filter(message => message.type === MESSAGE_RESULT).map(message => message.data);

        return new this({subject, state, result });
    }

    constructor(config) {
        Object.assign(this, config);
    }

    craft(message) {
        this.subject.onNext(message);
    }
}
