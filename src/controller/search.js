import Rx from "rx";

export default class {
    constructor(config) {
        Object.assign(this, config);
        this.chunk_size = 10000;
        this.work = new Rx.Subject();
        this.idle = this.workers
            .flatMap(Rx.Observable.from)
            .distinct()
            .flatMap(worker => worker.state.filter(state => state === "idle").map(() => worker))
        ;
        Rx.Observable
            .zip(this.idle, this.work, (worker, work) => {
                return {worker, work};
            })
            .subscribeOnNext(({worker, work}) => {
                console.log("send");
                worker.craft(work);
            })
        ;
    }

    addSearch() {
        var subscription = this.idle.map(() => {
            var next;
            var length = this.chunk_size;
            var chunk = new Array(length);
            var search = this.search;

            for( var i = 0; i < length && (next = search.next()); ++i) {
                chunk[i] = next;
            }
            if ( !next ) {
                subscription.dispose();
            }

            return chunk;
        }).subscribeOnNext(this.addWork, this);
    }

    addWork(work) {
        this.work.onNext(work);
    }
}
