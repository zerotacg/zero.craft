import Rx from "rx";

import Pattern from "zero/pattern/pattern";

export default class Craft {
    constructor( config ) {
        Object.assign(this, config);

        this.item = new Rx.ReplaySubject(1);
        this.patternFactory = Pattern;
    }

    setPattern( value ) {
        this.item.onNext(value);
    }

    createPatternStream() {
        return (this.item
                .map(this.patternFactory.create)
        );
    }
}
