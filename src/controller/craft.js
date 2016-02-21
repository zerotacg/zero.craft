import Rx from "rx";

import patterns from "data/pattern/patterns.json!";

export default class Craft {
    constructor( config ) {
        Object.assign(this, config);

        var parts = this.cratePartsStream();
        this.parts = parts;
    }

    cratePartsStream() {
        return (this.pattern
                .map(this.getPattern)
                .map(this.getParts)
                .map(this.createParts)
        );
    }

    getPattern( item ) {
        return patterns.filter(pattern => pattern.item === item)[0];
    }

    getParts( pattern ) {
        return pattern.parts;
    }

    createParts( parts ) {
        return parts.map(part => Object.assign({items: new Array(part.count).fill(null)}, part ));
    }

    createPartItems( part, items ) {
        return items.filter( item => item.part === part.type );
    }

    groupBySheet( items ) {
        return (items
                .groupBy(sheet => sheet)
                .flatMap(group => {
                    return group
                        .count()
                        .map(count => {
                            return {
                                sheet: group.key,
                                count
                            };
                        });
                })
                .toArray()
        );
    }
}
