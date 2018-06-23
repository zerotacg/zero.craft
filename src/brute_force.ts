import Iterator from "./combination/iterator";

export default class Search<TValue> {
    public possibilities: TValue[][];
    public current: any[];
    public iterators: Iterator[];

    constructor(config) {
        Object.assign(this, config);

        var possibilities = this.possibilities;
        this.iterators = this.current.map((current, group) => {
            var k = current.length;
            var n = possibilities[group].length;

            return new Iterator({n, k, current });
        });
    }

    next() {
        var iterators = this.iterators;
        var groups = iterators.length;
        var possibilities = this.possibilities;
        var result = [];
        var inc = 1;

        for( var g = 0; g < groups; ++g ) {
            var iterator = iterators[g];
            var indices = iterator.next(inc);
            inc = iterator.overflow;
            for( var i = 0; i < indices.length; ++i ) {
                result.push(possibilities[g][indices[i]]);
            }
        }

        if (inc) {
            return false;
        }

        return result;
    }
}
