import Rx from "rx";

export default class Items {
    static create({ count }) {
        var items = new Array(count).fill(null);
        var subject = new Rx.BehaviorSubject(items);

        return new Items({
            items,
            subject
        });
    }

    constructor( config ) {
        Object.assign(this, config);
    }

    setItems( items ) {
        this.items = items;
        this.onNext(items);
    }

    onNext( items ) {
        this.subject.onNext(items);
    }

    setItem( item, index ) {
        var items = this.items;

        items[index] = item;
        this.setItems(items);
    }
}
