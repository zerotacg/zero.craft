const craft = require('../craft').craft;

process.on('message', message => {
    const result = work(message);

    process.send(result);
});

function work(chunk) {
    var length = chunk.length;
    var result = new Array(length);
    for (var i = 0; i < length; ++i) {
        var mats = chunk[i];
        result[i] = {mats, result: craft(mats)};
    }

    return result;
}


