export default class Iterator {
    constructor(config) {
        Object.assign(this, config);

        var k = this.k;
        var empty = new Array(k).fill(0);
        var current = this.current || empty;
        this.current = current.concat(empty).splice(0, k);
        this.overflow = 0;
    }

    next() {
        var current = this.current;
        var n = this.n;
        var k = this.k;
        var inc = 1;
        var i, value;

        for ( i = 0; i < k; ++i ) {
            value = current[ i ] + inc;
            inc = (value / n) | 0;

            current[ i ] = value % n;
        }
        this.overflow = inc;

        var min = 0;
        for ( i = k - 1; i >= 0; --i ) {
            min = current[ i ] = (Math.max(min, current[ i ]));
        }

        this.current = current;

        return current;
    }
}
