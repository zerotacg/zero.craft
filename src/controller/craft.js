import Rx from "rx";

import Pattern from "zero/pattern/pattern";

export default class Craft {
    static create() {
        var subject = new Rx.BehaviorSubject();
        var pattern = new Rx.BehaviorSubject();

        return new Craft({
            subject,
            pattern
        });
    }

    constructor( config ) {
        Object.assign(this, config);

        this.subject.map(Pattern.create).subscribe( this.pattern );
    }

    setPattern( pattern ) {
        this.onNext(pattern);
    }

    onNext( pattern ) {
        this.subject.onNext(pattern);
    }
}
