import Rx from "rx";
import {craft} from "zero/craft";

const STATE_IDLE = "idle";
const STATE_BUSY = "busy";
const MESSAGE_STATE = "state";
const MESSAGE_RESULT = "result";

var messages = Rx.Observable.create(observer => {
    onmessage = function(e) {
        observer.onNext(e);
    };
}).publish().refCount();

var incoming = messages.map(e => e.data);
var outgoing = incoming.map(work);
outgoing.subscribeOnNext(postResult);

var idle = outgoing.map(() => STATE_IDLE);
var busy = incoming.map(() => STATE_BUSY);
Rx.Observable.merge(busy, idle)
    .distinctUntilChanged()
    .startWith(STATE_IDLE)
    .subscribeOnNext(postState)
;

function postState(state) {
    postMessage({type: MESSAGE_STATE, data: state});
}

function work(chunk) {
    var length = chunk.length;
    var result = new Array(length);
    for (var i = 0; i < length; ++i) {
        var mats = chunk[i];
        result[i] = {mats, result: craft(mats)};
    }

    return result;
}

function postResult(result) {
    postMessage({type: MESSAGE_RESULT, data: result});
}

