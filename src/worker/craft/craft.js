import Rx from "rx";

const STATE_IDLE = "idle";
const STATE_BUSY = "busy";
const MESSAGE_STATE = "state";
const MESSAGE_RESULT = "result";

var messages = Rx.Observable.create(observer => {
    onmessage = observer.onNext.bind(observer);
}).publish().refCount();

var incoming = messages.map(e => e.data);
var outgoing = incoming.map(work);
outgoing.subscribeOnNext(postResult);

incoming
    .map(() => STATE_BUSY)
    .merge(outgoing.map(() => STATE_IDLE))
    .distinctUntilChanged()
    .subscribeOnNext(postState)
;

function postState(state) {
    postMessage({type: MESSAGE_STATE, data: state});
}

function work(chunk) {
    //console.log("worker", "work", chunk);
    var length = chunk.length;
    var result = new Array(length);
    for (var i = 0; i < length; ++i) {
        result[i] = craft(chunk[i]);
    }

    return result;
}

function craft(mats) {
    for (var i = 0, length = 10000; i < length; ++i) {
        Math.sqrt(2);
    }

    return "done";
}

function postResult(result) {
    postMessage({type: MESSAGE_RESULT, data: result});
}

