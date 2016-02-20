import Rx from "rx";

export default class {
    constructor( config ) {
        Object.assign(this, config);

        this.pattern = new Rx.Subject();
        this.parts = new Rx.Subject();
    }

    createNextParts( pattern ) {
        return pattern.parts.map(this.createPart);
    }

    createPart( part ) {
        
    }
}
