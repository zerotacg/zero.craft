import { randomValue } from "zero/genetic/Math";

export default class Factory {

    constructor({ gene_pool }) {
        this.gene_pool = gene_pool;
        this.randomValue = randomValue;
    }

    population(size) {
        var population = new Array(size);

        for (var i = 0; i < size; ++i) {
            population[i] = this.seed();
        }

        return population;
    }

    seed() {
        return this.gene_pool.map(values => this.randomValue(values));
    }
}
