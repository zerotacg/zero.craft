export default class Search {
    constructor(config) {
        Object.assign(this, config);
    }

    next() {
        var current = this.current;
        var possibilities = this.possibilities;
        var inc = 1;

        this.current = current.map((value, index) => {
            var values = possibilities[index];
            var length = values.length;
            value += inc;
            inc = Math.floor(value / length);
            value = value % length;

            return value;
        });

        if (inc) {
            return false;
        }

        return current.map((current, index) => possibilities[index][current]);
    }
}
