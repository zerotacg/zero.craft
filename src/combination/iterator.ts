export default class Iterator {
    public overflow = 0;
    private current;
    private n;
    private k;

    constructor(config: Object) {
        Object.assign(this, config);
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
