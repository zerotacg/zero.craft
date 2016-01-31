import Stats from "zero/craft/stats";
import {COUNT as STAT_COUNT} from "zero/craft/stats";

export function prepare(mat) {
    var mat_stats = mat.stats;

    var stats = new Array(STAT_COUNT).fill(0);
    var used = new Array(STAT_COUNT).fill(0);
    Object.keys(mat_stats).reduce((values, index) => {
        values[index] = mat_stats[index] / 100;
        used[index] = 1;

        return values;
    }, stats);

    var prepared = Object.assign({}, mat);
    prepared.used = used;
    prepared.stats = stats;

    return prepared;
}

export function craft(mats) {
    var length = mats.length;
    var stats = new Stats();
    var values = stats.values;
    var counts = new Array(stats.values.length).fill(0);
    var used = new Array(stats.values.length).fill(0);

    for (var i = 0; i < length; ++i) {
        var mat = mats[i];
        var mat_stats = mat.stats;
        var stats_used = mat.used;
        for( var index = 0; index < STAT_COUNT; ++index ) {
            if ( stats_used[index] ) {
                values[index] += mat_stats[index];
                ++counts[index];
                used[index] = 1;
            }
        }
    }

    stats.div(counts);
    stats.stretch(used);

    return stats.values;
}
