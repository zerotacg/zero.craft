import Rx from "rx";
import Worker from "zero/search/worker";

const MINIMUM_WORKERS = 1;

export default class {
    constructor(config) {
        Object.assign(this, config);

        this.workers = new Rx.BehaviorSubject([]);
        this.createWorkers();
    }

    createWorkers() {
        var add = [];
        var count = 7;
        for( var i = 0; i < count; ++i ) {
            add.push( Worker.create() );
        }
        this.workers.onNext(this.workers.getValue().concat(add));
    }
}
