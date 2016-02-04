import Rx from "rx";

export default class {
    constructor(config) {
        Object.assign(this, config);
        this.chunk_size = 1000;
    }

    work() {
        var idle = this.workers.flatMap(Rx.Observable.from);

        var work = Rx.Observable.create(observer => {
            var next;
            var search = this.search;

            while( next = search.next() ) {
                observer.onNext(next);
            }
            observer.onCompleted();
        }).bufferWithCount(this.chunk_size);

        Rx.Observable
            .zip(idle, work, (worker, work) => {worker, work})
            .subscribeOnNext(({worker, work}) => {
                worker.send(work);
            })
        ;
    }
}
