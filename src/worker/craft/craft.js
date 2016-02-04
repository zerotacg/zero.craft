var STATE_IDLE = "idle";
var STATE_BUSY = "busy";
var MESSAGE_STATE = "state";
var MESSAGE_RESULT = "result";

onmessage = function(e) {
    postState(STATE_BUSY);
    postResult(work(e.data));
    postState(STATE_IDLE);
};

function postState(state) {
    postMessage({type: MESSAGE_STATE, data: state});
}

function work(chunk) {
    console.log("worker", "work", chunk);
    var length = chunk.length;
    var result = new Array(length);
    for( var i = 0; i < length; ++i) {
        result[i] = craft(chunk[i]);
    }

    return result;
}

function craft(mats) {
    for( var i = 0, length = 10000; i < length; ++i ) {
        Math.sqrt(2);
    }

    return "done";
}

function postResult(result) {
    postMessage({type: MESSAGE_RESULT, data: result});
}

