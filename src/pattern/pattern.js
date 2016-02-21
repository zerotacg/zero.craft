import patterns from "data/pattern/patterns.json!";

export default class Pattern {
    static create(item) {
        var data = Pattern.find(item);

        return new Pattern(data);
    }

    static find( item ) {
        return patterns.filter(pattern => pattern.item === item)[ 0 ];
    }

    constructor(config) {
        Object.assign(this, config);
    }
}
