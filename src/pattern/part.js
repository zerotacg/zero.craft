import Items from "zero/pattern/items";

export default class Part {
    static create( {type, count} ) {
        var items = Items.create({ count });

        return new Part({
            type,
            count,
            items
        });
    }

    constructor( config ) {
        Object.assign(this, config);
    }

    setItems( items ) {
        this.items.setItems( items );
    }
}
