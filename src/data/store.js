import Rx from "rx";

export default class Store {
    static create() {
        var value = [];

        return new Store({ value });
    }

    constructor( config ) {
        Object.assign(this, config);

        var value = this.value;
        this.items = new Rx.BehaviorSubject(value);
    }

    add( item ) {
        var value = this.value;

        value.push(item);
        this.onNext(value);
    }

    onNext( value ) {
        this.items.onNext(value);
    }

    remove( index ) {
        var value = this.value;

        value.splice(index, 1);
        this.onNext(value);
    }
}
