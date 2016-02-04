import Rx from "rx";

export default class {
    constructor(config) {
        Object.assign(this, config);
        this.chunk_size = 1000;
    }

    start() {
        this.subscription = this.idle_workers.subScribeOnNext(this.sendChunk, this);
    }

    sendChunk(worker) {
        var length = this.chunk_size;
        var search = this.search;
        var chunk = new Array(length);
        for (var i = 0; i < length; ++i) {
            chunk[i] = search.next();
        }
        worker.craft(chunk);
    }
}
