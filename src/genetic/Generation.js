import { randomValue } from "zero/genetic/Math";

export default class Generation {

    constructor(config) {
        Object.assign(this, config);
        this.randomValue = randomValue;
        this.random = Math.random;
    }

    rank() {
        var fitness = this.fitness;
        var candidates = this.population.map(candidate => {
            return {candidate, fitness: fitness(candidate)};
        });
        candidates.sort((a, b) => {
            return b.fitness - a.fitness;
        });

        return candidates.map(({candidate}) => candidate);
    }

    mutate(genes) {
        var random = this.random;
        var randomValue = this.randomValue;
        var mutation_rate = this.mutation_rate;
        var gene_pool = this.gene_pool;

        return genes.map((gene, index) => {
            if (random() >= mutation_rate) {
                gene = randomValue(gene_pool[index]);
            }

            return gene;
        });
    }

    crossover(genes_a, genes_b) {
        var randomValue = this.randomValue;

        return genes_a.map((gene, index) => {
            return randomValue([gene, genes_b[index]]);
        });
    }
}
