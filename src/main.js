import Search from "zero/brute_force";

var adriel_basic = {type: "adriel-basic", stats: {0: 20, 1: 0, 2: 20, 3: 20, 4: 0, 6: 20, 7: 20, 8: 60, 9: 20}};
var becker_fine = {type: "becker-fine", stats: {0: 35, 1: 15, 2: 75, 3: 35, 4: 35, 6: 15, 7: 35, 8: 35, 9: 35}};
var becker_excellent = {type: "becker-excellent", stats: {0: 65, 1: 45, 2: 100, 3: 65, 4: 65, 6: 45, 7: 65, 8: 65, 9: 65}};
var shaft = [
    adriel_basic,
    {type: "becker-basic", stats: {0: 20, 1: 0, 2: 60, 3: 20, 4: 20, 6: 0, 7: 20, 8: 20, 9: 20}},
    {type: "mitexi-basic", stats: {0: 1, 1: 20, 2: 20, 3: 0, 4: 20, 6: 60, 7: 20, 8: 20, 9: 20}},
    {type: "oath-basic", stats: {0: 20, 1: 0, 2: 20, 3: 60, 4: 20, 6: 20, 7: 0, 8: 20, 9: 20}},
    {type: "perfli-basic", stats: {0: 1, 1: 60, 2: 20, 3: 0, 4: 20, 6: 20, 7: 20, 8: 20, 9: 20}},

    {type: "adriel-fine", stats: {0: 35, 1: 15, 2: 35, 3: 35, 4: 15, 6: 35, 7: 35, 8: 75, 9: 35}},
    becker_fine,
    {type: "mitexi-fine", stats: {0: 15, 1: 35, 2: 35, 3: 15, 4: 35, 6: 75, 7: 35, 8: 35, 9: 35}},
    {type: "oath-fine", stats: {0: 35, 1: 15, 2: 35, 3: 75, 4: 35, 6: 35, 7: 15, 8: 35, 9: 35}},
    {type: "perfli-fine", stats: {0: 15, 1: 75, 2: 35, 3: 15, 4: 35, 6: 35, 7: 35, 8: 35, 9: 35}},

    {type: "adriel-choice", stats: {0: 50, 1: 30, 2: 50, 3: 50, 4: 30, 6: 50, 7: 50, 8: 90, 9: 50}},
    {type: "becker-choice", stats: {0: 50, 1: 30, 2: 90, 3: 50, 4: 50, 6: 30, 7: 50, 8: 50, 9: 50}},
    {type: "mitexi-choice", stats: {0: 30, 1: 50, 2: 50, 3: 30, 4: 50, 6: 90, 7: 50, 8: 50, 9: 50}},
    {type: "oath-choice", stats: {0: 50, 1: 30, 2: 50, 3: 90, 4: 50, 6: 50, 7: 30, 8: 50, 9: 50}},
    {type: "perfli-choice", stats: {0: 30, 1: 90, 2: 50, 3: 30, 4: 50, 6: 50, 7: 50, 8: 50, 9: 50}}

    //{type: "adriel-excellent", stats: {0: 65, 1: 45, 2: 65, 3: 65, 4: 45, 6: 65, 7: 65, 8: 100, 9: 65}},
    //becker_excellent,
    //{type: "mitexi-excellent", stats: {0: 45, 1: 65, 2: 65, 3: 45, 4: 65, 6: 100, 7: 65, 8: 65, 9: 65}},
    //{type: "oath-excellent", stats: {0: 65, 1: 45, 2: 65, 3: 100, 4: 65, 6: 65, 7: 45, 8: 65, 9: 65}},
    //{type: "perfli-excellent", stats: {0: 45, 1: 100, 2: 65, 3: 45, 4: 65, 6: 65, 7: 65, 8: 65, 9: 65}}
];

var anete_basic = {type: "anete-basic", stats: {0: 20, 1: 20, 2: 20, 4: 0, 6: 60, 7: 0, 8: 20, 9: 20}};
var grip = [
    anete_basic,
    {type: "buo-basic", stats: {0: 20, 1: 60, 2: 20, 4: 20, 6: 20, 7: 20, 8: 0, 9: 0}},
    {type: "dzao-basic", stats: {0: 20, 1: 20, 2: 0, 4: 20, 6: 20, 7: 20, 8: 60, 9: 0}},
    {type: "shu-basic", stats: {0: 20, 1: 20, 2: 60, 4: 20, 6: 20, 7: 0, 8: 20, 9: 0}},

    {type: "anete-fine", stats: {0: 35, 1: 35, 2: 35, 4: 15, 6: 75, 7: 15, 8: 35, 9: 35}},
    {type: "buo-fine", stats: {0: 35, 1: 75, 2: 35, 4: 35, 6: 35, 7: 35, 8: 15, 9: 15}},
    {type: "dzao-fine", stats: {0: 35, 1: 35, 2: 15, 4: 35, 6: 35, 7: 35, 8: 75, 9: 15}},
    {type: "shu-fine", stats: {0: 35, 1: 35, 2: 75, 4: 35, 6: 35, 7: 15, 8: 35, 9: 15}},

    {type: "anete-choice", stats: {0: 50, 1: 50, 2: 50, 4: 30, 6: 90, 7: 30, 8: 50, 9: 50}},
    {type: "buo-choice", stats: {0: 50, 1: 90, 2: 50, 4: 50, 6: 50, 7: 50, 8: 30, 9: 30}},
    {type: "dzao-choice", stats: {0: 50, 1: 50, 2: 30, 4: 50, 6: 50, 7: 50, 8: 90, 9: 30}},
    {type: "shu-choice", stats: {0: 50, 1: 50, 2: 90, 4: 50, 6: 50, 7: 30, 8: 50, 9: 30}}

    //{type: "anete-excellent", stats: {0: 66, 1: 66, 2: 66, 4: 45, 6: 100, 7: 45, 8: 66, 9: 66}},
    //{type: "buo-excellent", stats: {0: 66, 1: 100, 2: 66, 4: 66, 6: 66, 7: 66, 8: 45, 9: 45}},
    //{type: "dzao-excellent", stats: {0: 66, 1: 66, 2: 45, 4: 66, 6: 66, 7: 66, 8: 100, 9: 45}},
    //{type: "shu-excellent", stats: {0: 66, 1: 66, 2: 100, 4: 66, 6: 66, 7: 45, 8: 66, 9: 45}}
];

var possibilities = [
    shaft, shaft, shaft, shaft, shaft, shaft,
    grip, grip, grip, grip, grip, grip
];

var zun = {
    type: "zun-excellent",
    stats: {0: 45, 1: 65, 2: 100, 26: 65, 27: 65, 28: 65, 29: 65, 30: 45, 31: 65, 32: 65, 33: 65}
};
//[ 2, 2, 12, 10, 7, 5, 5, 1, 0, 0, 0, 0, 0 ]
var search = new Search({possibilities, current: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]});
var amber = new Array(15).fill(zun);
var best = [
    becker_excellent,
    becker_excellent,
    becker_fine,
    adriel_basic,
    adriel_basic,
    anete_basic,
    anete_basic,
    anete_basic,
    anete_basic,
    anete_basic
].concat(amber);
var best_fitness = fitness(best);

function fitness(mats) {
    var result = craft(mats);

    return result[16];
}

function craft(mats) {
    var material_stats = mats.map(mat => mat.stats);
    var length = material_stats.length;
    var stats = new Array(17).fill(0);
    var counts = new Array(17).fill(0);
    var mapping = {
        0: 0,
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        6: 5,
        7: 6,
        8: 7,
        9: 8,
        26: 9,
        27: 10,
        28: 11,
        29: 12,
        30: 13,
        31: 14,
        32: 15,
        33: 16
    };

    for (var i = 0; i < length; ++i) {
        var mat = material_stats[i];
        Object.keys(mat).reduce((values, key) => {
            var index = mapping[key];
            values[index] += mat[key];
            ++counts[index];

            return values;
        }, stats);
    }

    var stat_count = counts.reduce(sum);
    var average = stats.reduce(sum) / stat_count;
    var factors = counts.map(value => value ? 1 / value : 0);
    var plain_stats = stats.map((value, index) => value * factors[index]);
    var max_value = plain_stats.reduce(max);
    var delta = max_value - average;
    var STAT_SCALE_FACTOR = 30;
    var factor = Math.max(1, Math.min(2, STAT_SCALE_FACTOR / delta));
    var scaled_stats = plain_stats
        .map(stat => stat - average)
        .map(stat => stat * factor)
        .map(stat => stat + average)
        ;
    var count_greater_0 = scaled_stats.map(stat => stat > 0 ? 1 : 0).reduce(sum);
    var count_less_1 = scaled_stats.map(stat => stat < 100 ? 1 : 0).reduce(sum);
    var clamped_stats = scaled_stats.map(clamp);
    var plain_sum = plain_stats.reduce(sum);
    var clamped_sum = clamped_stats.reduce(sum);

    delta = clamped_sum - plain_sum;
    if (delta > 0) {
        delta = -delta / count_greater_0;
    }
    else {
        delta = -delta / count_less_1;
    }

    return clamped_stats.map(stat => stat + delta).map(clamp);
}

function sum(total, current) {
    return total + current;
}

function max(total, current) {
    return current > total ? current : total;
}

function clamp(value) {
    return Math.max(0, Math.min(100, value));
}

var i = 0;
var current;
while ( current = search.next()) {
    ++i;
    if ( i > 1000000 ) {
        console.log("searching", search.current);
        i = 0;
    }
    current = current.concat(amber);
    var current_fitness = fitness(current);
    if (current_fitness > best_fitness) {
        best_fitness = current_fitness;
        best = current;
        var mats = best.slice(0,13).map(mat => mat.type);
        console.log("new best", best_fitness, mats);
        console.log("next", search.current);
    }
}

var mats = best.slice(0,13).map(mat => mat.type);
console.log("new best", best_fitness, mats);
