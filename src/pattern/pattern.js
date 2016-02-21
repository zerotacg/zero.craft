import Rx from "rx";

import Part from "zero/pattern/part";

import patterns from "data/pattern/patterns.json!";

const empty = { item: null, parts: [] };

export default class Pattern {
    static create() {
        var subject = new Rx.BehaviorSubject();

        return new Pattern({
            subject
        });
    }

    static find( item ) {
        return patterns.filter(pattern => pattern.item === item)[ 0 ] || empty;
    }

    constructor( config ) {
        Object.assign(this, config);
    }

    load( id ) {
        this.setData(Pattern.find(id));
    }

    setData({ item, parts }) {
        this.setItem( item );
        this.setParts( parts );

        this.onNext();
    }

    setItem( item ) {
        this.item = item;
    }

    setParts( parts ) {
        this.parts = parts.map(Part.create);
    }

    onNext() {
        var item = this.item;
        var parts = this.parts;

        this.subject.onNext({ item, parts });
    }

    setFormular( formular ) {
        formular.forEach(this.setItems, this);
    }

    setItems( items, index ) {
        var part = this.parts[ index ];
        part.setItems(items);
    }
}
