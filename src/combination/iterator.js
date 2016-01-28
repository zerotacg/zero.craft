export default class Iterator {
    constructor(config) {
        Object.assign(this, config);

        this.init();
    }

    init() {
        var k = this.k;
        var empty = new Array(k).fill(0);
        var current = this.current || empty;
        this.current = current.concat(empty).splice(0, k);
    }

    next() {
        var current = this.current;
        var inc = 1;
        var n = this.n;

        this.current = current.map(value =>{
            value += inc;
            inc = Math.floor(value / n);

            return value % n;
        });

        if ( inc ) {
            return false;
        }

        return this.current;
    }
}
