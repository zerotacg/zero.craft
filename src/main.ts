import * as cluster from 'cluster';
import {Worker} from 'cluster';
import {cpus} from 'os';
import Search from './brute_force';
import {craft, prepare} from './craft';
//import Stats from "./craft/stats";

var adriel_basic = {type: 'basic adriel', stats: {0: 20, 1: 0, 2: 20, 3: 20, 4: 0, 6: 20, 7: 20, 8: 60, 9: 20}};
var becker_fine = {type: 'fine becker', stats: {0: 35, 1: 15, 2: 75, 3: 35, 4: 35, 6: 15, 7: 35, 8: 35, 9: 35}};
var becker_excellent = {
    type: 'excellent becker',
    stats: {0: 65, 1: 45, 2: 100, 3: 65, 4: 65, 6: 45, 7: 65, 8: 65, 9: 65}
};
var oath_basic = {type: 'basic oath', stats: {0: 20, 1: 0, 2: 20, 3: 60, 4: 20, 6: 20, 7: 0, 8: 20, 9: 20}};
var oath_choice = {type: 'choice oath', stats: {0: 50, 1: 30, 2: 50, 3: 90, 4: 50, 6: 50, 7: 30, 8: 50, 9: 50}};
var perfling_basic = {type: 'basic perfli', stats: {0: 1, 1: 60, 2: 20, 3: 0, 4: 20, 6: 20, 7: 20, 8: 20, 9: 20}};
var shaft = [
    adriel_basic,
    {type: 'basic becker', stats: {0: 20, 1: 0, 2: 60, 3: 20, 4: 20, 6: 0, 7: 20, 8: 20, 9: 20}},
    {type: 'basic mitexi', stats: {0: 1, 1: 20, 2: 20, 3: 0, 4: 20, 6: 60, 7: 20, 8: 20, 9: 20}},
    oath_basic,
    perfling_basic,

    {type: 'fine adriel', stats: {0: 35, 1: 15, 2: 35, 3: 35, 4: 15, 6: 35, 7: 35, 8: 75, 9: 35}},
    becker_fine,
    {type: 'fine mitexi', stats: {0: 15, 1: 35, 2: 35, 3: 15, 4: 35, 6: 75, 7: 35, 8: 35, 9: 35}},
    {type: 'fine oath', stats: {0: 35, 1: 15, 2: 35, 3: 75, 4: 35, 6: 35, 7: 15, 8: 35, 9: 35}},
    {type: 'fine perfli', stats: {0: 15, 1: 75, 2: 35, 3: 15, 4: 35, 6: 35, 7: 35, 8: 35, 9: 35}},

    {type: 'choice adriel', stats: {0: 50, 1: 30, 2: 50, 3: 50, 4: 30, 6: 50, 7: 50, 8: 90, 9: 50}},
    {type: 'choice becker', stats: {0: 50, 1: 30, 2: 90, 3: 50, 4: 50, 6: 30, 7: 50, 8: 50, 9: 50}},
    {type: 'choice mitexi', stats: {0: 30, 1: 50, 2: 50, 3: 30, 4: 50, 6: 90, 7: 50, 8: 50, 9: 50}},
    oath_choice,
    {type: 'choice perfli', stats: {0: 30, 1: 90, 2: 50, 3: 30, 4: 50, 6: 50, 7: 50, 8: 50, 9: 50}}

    //{type: "excellent adriel", stats: {0: 65, 1: 45, 2: 65, 3: 65, 4: 45, 6: 65, 7: 65, 8: 100, 9: 65}},
    //becker_excellent,
    //{type: "excellent mitexi", stats: {0: 45, 1: 65, 2: 65, 3: 45, 4: 65, 6: 100, 7: 65, 8: 65, 9: 65}},
    //{type: "excellent oath", stats: {0: 65, 1: 45, 2: 65, 3: 100, 4: 65, 6: 65, 7: 45, 8: 65, 9: 65}},
    //{type: "excellent perfli", stats: {0: 45, 1: 100, 2: 65, 3: 45, 4: 65, 6: 65, 7: 65, 8: 65, 9: 65}}
].map(prepare);

var anete_basic = {type: 'basic anete', stats: {0: 20, 1: 20, 2: 20, 4: 0, 6: 60, 7: 0, 8: 20, 9: 20}};
var dzao_basic = {type: 'basic dzao', stats: {0: 20, 1: 20, 2: 0, 4: 20, 6: 20, 7: 20, 8: 60, 9: 0}};
var buo_fine = {type: 'fine buo', stats: {0: 35, 1: 75, 2: 35, 4: 35, 6: 35, 7: 35, 8: 15, 9: 15}};
var grip = [
    anete_basic,
    {type: 'basic buo', stats: {0: 20, 1: 60, 2: 20, 4: 20, 6: 20, 7: 20, 8: 0, 9: 0}},
    dzao_basic,
    {type: 'basic shu', stats: {0: 20, 1: 20, 2: 60, 4: 20, 6: 20, 7: 0, 8: 20, 9: 0}},

    {type: 'fine anete', stats: {0: 35, 1: 35, 2: 35, 4: 15, 6: 75, 7: 15, 8: 35, 9: 35}},
    buo_fine,
    {type: 'fine dzao', stats: {0: 35, 1: 35, 2: 15, 4: 35, 6: 35, 7: 35, 8: 75, 9: 15}},
    {type: 'fine shu', stats: {0: 35, 1: 35, 2: 75, 4: 35, 6: 35, 7: 15, 8: 35, 9: 15}},

    {type: 'choice anete', stats: {0: 50, 1: 50, 2: 50, 4: 30, 6: 90, 7: 30, 8: 50, 9: 50}},
    {type: 'choice buo', stats: {0: 50, 1: 90, 2: 50, 4: 50, 6: 50, 7: 50, 8: 30, 9: 30}},
    {type: 'choice dzao', stats: {0: 50, 1: 50, 2: 30, 4: 50, 6: 50, 7: 50, 8: 90, 9: 30}},
    {type: 'choice shu', stats: {0: 50, 1: 50, 2: 90, 4: 50, 6: 50, 7: 30, 8: 50, 9: 30}}

    //{type: "excellent anete", stats: {0: 66, 1: 66, 2: 66, 4: 45, 6: 100, 7: 45, 8: 66, 9: 66}},
    //{type: "excellent buo", stats: {0: 66, 1: 100, 2: 66, 4: 66, 6: 66, 7: 66, 8: 45, 9: 45}},
    //{type: "excellent dzao", stats: {0: 66, 1: 66, 2: 45, 4: 66, 6: 66, 7: 66, 8: 100, 9: 45}},
    //{type: "excellent shu", stats: {0: 66, 1: 66, 2: 100, 4: 66, 6: 66, 7: 45, 8: 66, 9: 45}}
].map(prepare);

var possibilities = [
    shaft,
    grip
];

var zun_excellent = prepare({
    type: 'excellent zun',
    stats: {0: 45, 1: 65, 2: 100, 26: 65, 27: 65, 28: 65, 29: 65, 30: 45, 31: 65, 32: 65, 33: 65}
});
var zun_sup = prepare({
    type: 'zun-supreme',
    stats: {0: 60, 1: 82, 2: 100, 26: 82, 27: 82, 28: 82, 29: 82, 30: 60, 31: 82, 32: 82, 33: 82}
});

var search = new Search({possibilities, current: [[-1, 0, 0, 0, 0], [0, 0, 0, 0, 0]]});
var amber = new Array(10).fill(zun_excellent);
var best;
var best_fitness = 0;

function fitness({mats, result}) {
    var Stat_DURABILITY = 0;
    var Stat_SAP_LOAD = 2;
    var Stat_DODGE = 6;
    var Stat_ELEMENTAL_CASTING_SPEED = 26;
    var durability = Math.floor(100 * result[Stat_DURABILITY] * 1.2) / 100; // 100 - 200, 250, 300
    var sap = Math.floor(2500 * result[Stat_SAP_LOAD] * 1.2) / 2500;
    var magic = Math.floor(80 * result[Stat_ELEMENTAL_CASTING_SPEED] * 1.2);
    var simplicity = 1 - (mats.filter((mat, index, array) => array.indexOf(mat) === index).length) / mats.length;

    return (20 + magic) * 10000000000 + simplicity * 1000000 * 0 + sap * 100000 + durability;
}

cluster.setupMaster({
    exec: 'src/worker/craft.js'
});

const workers: Worker[] = [];
for( let i = cpus().length; i--;) {
    const worker = cluster.fork();
    worker.on('message', onResults);
    workers.push(worker);
}

var i = 0;
var count = 11628 * 4368;
var chunk;
var found = [];
const CHUNK_SIZE = 1000;

async function main() {
    while (chunk = getChunk(search, CHUNK_SIZE)) {
        i += chunk.length;
        if (i % 500000 === 0) {
            console.log('searching %:', Math.round((i / count) * 10000) / 100);
        }

        const worker = await nextWorker();
        worker.send(chunk);
    }

    var mats = best.slice(0, 13).map(mat => mat.type);
    console.log('best', 'mats\n', mats, 'craft', craft(best), 'fitness', best_fitness);
}

function getChunk(search, size) {
    const chunk = [];
    let current;
    while ((current = search.next()) && size--) {
        chunk.push(current.concat(amber));
    }

    return chunk.length && chunk;
}

function nextWorker(): Promise<Worker> {
    return Promise.race(workers.map(ready));
}

function ready(worker): Promise<Worker> {
    return new Promise((resolve) => {
        worker.send([]);
        worker.once('message', () => resolve(worker));
    });
}

function onResults(results) {
    results.forEach(onResult)
}

function onResult({mats, result}) {
    var current_fitness = fitness({mats, result});
    if (current_fitness >= best_fitness) {
        found.push({fitness: current_fitness, mats: mats.map(mat => mat.type)});
    }

    if (current_fitness > best_fitness) {
        best_fitness = current_fitness;
        best = mats;
        var mats = best.slice(0, 13).map(mat => mat.type);
        console.log('best', 'mats\n', mats, 'craft', craft(best), 'fitness', best_fitness);
        console.log('next', search.current);
    }
}

main();

//console.log(craft([
//    oath_basic,oath_choice,perfling_basic,perfling_basic,perfling_basic,perfling_basic,
//    dzao_basic,dzao_basic,dzao_basic,buo_fine,buo_fine,buo_fine
//].concat(new Array(15).fill(zun))));
