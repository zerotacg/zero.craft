import Rx from "rx";

import Pattern from "zero/pattern/pattern";

export default class Craft {
    static create() {
        var pattern = Pattern.create();

        return new Craft({
            pattern
        });
    }

    constructor( config ) {
        Object.assign(this, config);
    }

    setPattern( pattern ) {
        this.pattern.load(pattern);
    }
}
