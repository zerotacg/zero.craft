import Part from "zero/pattern/part";

import patterns from "data/pattern/patterns.json!";

const empty = { parts: [] };

export default class Pattern {
    static create( item ) {
        var data = Pattern.find(item);
        var parts = data.parts.map(Part.create);

        return new Pattern({
            parts
        });
    }

    static find( item ) {
        return patterns.filter(pattern => pattern.item === item)[ 0 ] || empty;
    }

    constructor( config ) {
        Object.assign(this, config);
    }

    setFormular( formular ) {
        formular.forEach(this.setItems, this);
    }

    setItems( items, index ) {
        var part = this.parts[index];
        part.setItems( items );
    }
}
