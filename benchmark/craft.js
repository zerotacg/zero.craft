var Benchmark = require("benchmark");

var suite = new Benchmark.Suite;

const min = Math.min;
const max = Math.max;
const abs = Math.abs;

const STAT_COUNT = 17;

const MIN_DELTA = 0.3;
const MAX_STRETCH_FACTOR = 2.0;

function clamp(value) {
    return max(0, min(value, 1));
}

function Stats() {
    this.values = new Array(STAT_COUNT).fill(0);
}

Stats.prototype.div = function (divisors) {
    var values = this.values;
    for (var i = 0; i < STAT_COUNT; ++i) {
        values[i] /= divisors[i] || 1;
    }
};

Stats.prototype.fill = function (value) {
    this.values.fill(value);
};

Stats.prototype.stretch = function () {
    var index_max = 0;
    var value_max = 0;
    var stat_count = 0;
    var energy = 0;
    var values = this.values;
    var i, value;

    for (i = 0; i < STAT_COUNT; ++i) {
        value = values[ i ] = clamp(values[ i ]);
        energy += value;
        ++stat_count;
        if ( value > value_max ) {
            value_max = value;
            index_max = i;
        }
    }

    var mean = energy / stat_count;
    var delta = value_max - mean;
    if (delta < MIN_DELTA) {
        var stretch_factor = min(MIN_DELTA / delta, MAX_STRETCH_FACTOR);
        var new_energy = 0;
        var count_greater_zero = 0;
        var count_less_one = 0;
        for (i = 0; i < STAT_COUNT; ++i) {
            value = values[ i ];
            value = (value - mean) * stretch_factor + mean;
            value = values[ i ] = clamp(value);
            new_energy += value;

            if ( value > 0 ) {
                ++count_greater_zero;
            }
            if ( value < 1 ) {
                ++count_less_one;
            }
        }

        delta = new_energy - energy;
        var pass = 0;
        var max_delta = 0.001 * stat_count;
        while (abs(delta) > max_delta) {
            if (delta > 0) {
                delta = -delta / count_greater_zero;
            } else {
                delta = -delta / count_less_one;
            }

            new_energy = 0;
            count_greater_zero = 0;
            count_less_one = 0;

            for (i = 0; i < STAT_COUNT; ++i) {
                value = values[ i ] = clamp(values[ i ] + delta);
                new_energy += value;

                if ( value > 0 ) {
                    ++count_greater_zero;
                }
                if ( value < 1 ) {
                    ++count_less_one;
                }
            }

            delta = new_energy - energy;

            console.assert(++pass <= STAT_COUNT);
        }
    }
};

var mat_1 = {
    stats: [0.2, 0.0, 0.2, 0.2, 0.2, 0.0, 0.2, 0.2, 0.6, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2],
    used:  new Array(STAT_COUNT).fill(1)
};

// add tests
suite
    .add("craft array 1", function () {
        var mats = new Array(20).fill(mat_1);
        var stats = new Stats();
        var counts = new Array(stats.values.length);
        var length = mats.length;

        stats.fill(0);
        counts.fill(0);
        var values = stats.values;

        for (var i = 0; i < length; ++i) {
            var mat = mats[i];
            var mat_stats = mat.stats;
            var stats_used = mat.used;
            for (var index = 0; index < STAT_COUNT; ++index) {
                if (stats_used[index]) {
                    values[index] += mat_stats[index];
                    ++counts[index];
                }
            }
        }

        stats.div(counts);
        stats.stretch();
    })
    // add listeners
    .on("cycle", function (event) {
        console.log(String(event.target));
    })
    .on("complete", function () {
        console.log("Fastest is " + this.filter("fastest").map("name"));
    })
    // run async
    .run({'async': true})
;
