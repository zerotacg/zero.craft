export default class Iterator {
    constructor(config) {
        Object.assign(this, config);

        this.overflow = 0;
    }

    next( inc ) {
        var current = this.current;
        var n = this.n;
        var k = this.k;
        var i, value;
        if ( inc === undefined ) {
            inc = 1;
        }

        for ( i = 0; i < k; ++i ) {
            value = current[ i ] + inc;
            inc = Math.floor(value / n);

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
