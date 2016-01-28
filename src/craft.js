const Stat = {
    COUNT: 34
};

export class Stats {
    constructor() {
        this.values = new Array(Stat.COUNT).fill(0);
        this.counts = new Array(Stat.COUNT).fill(0);
        this.used = new Array(Stat.COUNT).fill(1);
    }

    add(stats) {
        var values = this.values;
        var counts = this.counts;
        var used = this.used;

        for (var i = 0; i < Stat.count; ++i) {
            var value = stats[i] || 0;
            var use = used[i];
            values[i] += use * value;
            counts[i] += use;
        }
    }
}
