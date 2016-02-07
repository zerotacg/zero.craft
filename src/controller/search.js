import Rx from "rx";

export default class {
    constructor(config) {
        this.chunk_size = 10000;
        this.fixed = [];

        Object.assign(this, config);

        this.work = new Rx.Subject();
        this.idle = this.workers
            .flatMap(workers => Rx.Observable.from(workers))
            .distinct()
            .flatMap(worker => worker.state.filter(state => state === "idle").map(() => worker))
        ;
        this.result = this.workers
            .flatMap(workers => Rx.Observable.from(workers))
            .distinct()
            .flatMap(worker => worker.result)
        ;
        Rx.Observable
            .zip(this.idle, this.work, (worker, work) => {
                return {worker, work};
            })
            .subscribeOnNext(({worker, work}) => {
                console.log("send", work.length);
                worker.craft(work);
            })
        ;
    }

    addSearch() {
        var work = Rx.Observable.create(observer=> {
            var next;
            var search = this.search;

            while(next = search.next()) {
                observer.onNext(next.concat(this.fixed));
            }
            observer.onCompleted();
        }).bufferWithCount(this.chunk_size);
        work.subscribeOnNext(this.addWork, this);
    }

    addWork(work) {
        this.work.onNext(work);
    }
}
