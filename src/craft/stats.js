const min = Math.min;
const max = Math.max;
const abs = Math.abs;

const STAT_COUNT = 34;

const MIN_DELTA = 0.3;
const MAX_STRETCH_FACTOR = 2.0;

function clamp(value) {
    return max(0, min(value, 1));
}

export default class Stats {
    constructor() {
        this.values = new Array(STAT_COUNT).fill(0);
    }

    div(divisors) {
        var values = this.values;
        for (var i = 0; i < STAT_COUNT; ++i) {
            values[i] /= divisors[i] || 1;
        }
    }

    stretch(used) {
        var index_max = 0;
        var value_max = 0;
        var stat_count = 0;
        var energy = 0;
        var values = this.values;
        var i, value;

        for (i = 0; i < STAT_COUNT; ++i) {
            if (used[i]) {
                value = values[i] = clamp(values[i]);
                energy += value;
                ++stat_count;
                if (value > value_max) {
                    value_max = value;
                    index_max = i;
                }
            }
        }

        var mean = energy / stat_count;
        var delta = value_max - mean;
        console.log("max", value_max, "mean", mean, "delta", delta, "energy", energy, "stat_count", stat_count);
        if (delta < MIN_DELTA) {
            var stretch_factor = MIN_DELTA / delta;
            stretch_factor = min(stretch_factor, MAX_STRETCH_FACTOR);
            console.log("stretch_factor", stretch_factor);
            var new_energy = 0;
            var count_greater_zero = 0;
            var count_less_one = 0;
            for (i = 0; i < STAT_COUNT; ++i) {
                if (used[i]) {
                    value = values[i];
                    value = (value - mean) * stretch_factor + mean;
                    value = values[i] = clamp(value);
                    new_energy += value;

                    if (value > 0) {
                        ++count_greater_zero;
                    }
                    if (value < 1) {
                        ++count_less_one;
                    }
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
                    if (used[i]) {
                        value = values[i] = clamp(values[i] + delta);
                        new_energy += value;

                        if (value > 0) {
                            ++count_greater_zero;
                        }
                        if (value < 1) {
                            ++count_less_one;
                        }
                    }
                }

                delta = new_energy - energy;

                console.assert(++pass <= STAT_COUNT);
            }
        }
    }
}
