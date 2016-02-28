import Rx from "rx";

import Items from "zero/pattern/items";

import parts from "data/pattern/parts.json!";

const empty = { icon: null, label: null, stat: [] };

export default class Part {
    static create({ type, count }) {
        var items = Items.create({ count });
        var subject = new Rx.BehaviorSubject();

        return new Part({
            type,
            count,
            items,
            subject
        });
    }

    static find( id ) {
        return parts.filter(part => part._id === id)[ 0 ] || empty;
    }

    constructor( config ) {
        Object.assign(this, config);
    }

    load( id ) {
        this.setData(Part.find(id));
    }

    setData() {}

    setItems( items ) {
        this.items.setItems( items );
    }
}
