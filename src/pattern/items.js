import Rx from "rx";

export default class Items {
    static create({ count }) {
        var value = new Array(count).fill(null);

        return new Items({ value });
    }

    constructor( config ) {
        Object.assign(this, config);

        var value = this.value;
        this.items = new Rx.BehaviorSubject(value);
    }

    set( index, item ) {
        var value = this.value;

        value[index] = item;
        this.onNext(value);
    }

    onNext( value ) {
        this.items.onNext(value);
    }
}
