import Search from "zero/brute_force";
import Stats from "zero/craft/stats";
import {craft, prepare} from "zero/craft";

var adriel_basic = {type: "adriel-basic", stats: {0: 20, 1: 0, 2: 20, 3: 20, 4: 0, 6: 20, 7: 20, 8: 60, 9: 20}};
var becker_fine = {type: "becker-fine", stats: {0: 35, 1: 15, 2: 75, 3: 35, 4: 35, 6: 15, 7: 35, 8: 35, 9: 35}};
var becker_excellent = {
    type: "becker-excellent",
    stats: {0: 65, 1: 45, 2: 100, 3: 65, 4: 65, 6: 45, 7: 65, 8: 65, 9: 65}
};
var oath_basic = {type: "oath-basic", stats: {0: 20, 1: 0, 2: 20, 3: 60, 4: 20, 6: 20, 7: 0, 8: 20, 9: 20}};
var oath_choice = {type: "oath-choice", stats: {0: 50, 1: 30, 2: 50, 3: 90, 4: 50, 6: 50, 7: 30, 8: 50, 9: 50}};
var perfling_basic = {type: "perfli-basic", stats: {0: 1, 1: 60, 2: 20, 3: 0, 4: 20, 6: 20, 7: 20, 8: 20, 9: 20}};
var shaft = [
    adriel_basic,
    {type: "becker-basic", stats: {0: 20, 1: 0, 2: 60, 3: 20, 4: 20, 6: 0, 7: 20, 8: 20, 9: 20}},
    {type: "mitexi-basic", stats: {0: 1, 1: 20, 2: 20, 3: 0, 4: 20, 6: 60, 7: 20, 8: 20, 9: 20}},
    oath_basic,
    perfling_basic,

    {type: "adriel-fine", stats: {0: 35, 1: 15, 2: 35, 3: 35, 4: 15, 6: 35, 7: 35, 8: 75, 9: 35}},
    becker_fine,
    {type: "mitexi-fine", stats: {0: 15, 1: 35, 2: 35, 3: 15, 4: 35, 6: 75, 7: 35, 8: 35, 9: 35}},
    {type: "oath-fine", stats: {0: 35, 1: 15, 2: 35, 3: 75, 4: 35, 6: 35, 7: 15, 8: 35, 9: 35}},
    {type: "perfli-fine", stats: {0: 15, 1: 75, 2: 35, 3: 15, 4: 35, 6: 35, 7: 35, 8: 35, 9: 35}},

    {type: "adriel-choice", stats: {0: 50, 1: 30, 2: 50, 3: 50, 4: 30, 6: 50, 7: 50, 8: 90, 9: 50}},
    {type: "becker-choice", stats: {0: 50, 1: 30, 2: 90, 3: 50, 4: 50, 6: 30, 7: 50, 8: 50, 9: 50}},
    {type: "mitexi-choice", stats: {0: 30, 1: 50, 2: 50, 3: 30, 4: 50, 6: 90, 7: 50, 8: 50, 9: 50}},
    oath_choice,
    {type: "perfli-choice", stats: {0: 30, 1: 90, 2: 50, 3: 30, 4: 50, 6: 50, 7: 50, 8: 50, 9: 50}},

    {type: "adriel-excellent", stats: {0: 65, 1: 45, 2: 65, 3: 65, 4: 45, 6: 65, 7: 65, 8: 100, 9: 65}},
    becker_excellent,
    {type: "mitexi-excellent", stats: {0: 45, 1: 65, 2: 65, 3: 45, 4: 65, 6: 100, 7: 65, 8: 65, 9: 65}},
    {type: "oath-excellent", stats: {0: 65, 1: 45, 2: 65, 3: 100, 4: 65, 6: 65, 7: 45, 8: 65, 9: 65}},
    {type: "perfli-excellent", stats: {0: 45, 1: 100, 2: 65, 3: 45, 4: 65, 6: 65, 7: 65, 8: 65, 9: 65}}
].map(prepare);

var anete_basic = {type: "anete-basic", stats: {0: 20, 1: 20, 2: 20, 4: 0, 6: 60, 7: 0, 8: 20, 9: 20}};
var dzao_basic = {type: "dzao-basic", stats: {0: 20, 1: 20, 2: 0, 4: 20, 6: 20, 7: 20, 8: 60, 9: 0}};
var buo_fine = {type: "buo-fine", stats: {0: 35, 1: 75, 2: 35, 4: 35, 6: 35, 7: 35, 8: 15, 9: 15}};
var grip = [
    anete_basic,
    {type: "buo-basic", stats: {0: 20, 1: 60, 2: 20, 4: 20, 6: 20, 7: 20, 8: 0, 9: 0}},
    dzao_basic,
    {type: "shu-basic", stats: {0: 20, 1: 20, 2: 60, 4: 20, 6: 20, 7: 0, 8: 20, 9: 0}},

    {type: "anete-fine", stats: {0: 35, 1: 35, 2: 35, 4: 15, 6: 75, 7: 15, 8: 35, 9: 35}},
    buo_fine,
    {type: "dzao-fine", stats: {0: 35, 1: 35, 2: 15, 4: 35, 6: 35, 7: 35, 8: 75, 9: 15}},
    {type: "shu-fine", stats: {0: 35, 1: 35, 2: 75, 4: 35, 6: 35, 7: 15, 8: 35, 9: 15}},

    {type: "anete-choice", stats: {0: 50, 1: 50, 2: 50, 4: 30, 6: 90, 7: 30, 8: 50, 9: 50}},
    {type: "buo-choice", stats: {0: 50, 1: 90, 2: 50, 4: 50, 6: 50, 7: 50, 8: 30, 9: 30}},
    {type: "dzao-choice", stats: {0: 50, 1: 50, 2: 30, 4: 50, 6: 50, 7: 50, 8: 90, 9: 30}},
    {type: "shu-choice", stats: {0: 50, 1: 50, 2: 90, 4: 50, 6: 50, 7: 30, 8: 50, 9: 30}},

    {type: "anete-excellent", stats: {0: 66, 1: 66, 2: 66, 4: 45, 6: 100, 7: 45, 8: 66, 9: 66}},
    {type: "buo-excellent", stats: {0: 66, 1: 100, 2: 66, 4: 66, 6: 66, 7: 66, 8: 45, 9: 45}},
    {type: "dzao-excellent", stats: {0: 66, 1: 66, 2: 45, 4: 66, 6: 66, 7: 66, 8: 100, 9: 45}},
    {type: "shu-excellent", stats: {0: 66, 1: 66, 2: 100, 4: 66, 6: 66, 7: 45, 8: 66, 9: 45}}
].map(prepare);

var possibilities = [
    shaft,
    grip
];

var zun_excellent = prepare({
    type: "zun-excellent",
    stats: {0: 45, 1: 65, 2: 100, 26: 65, 27: 65, 28: 65, 29: 65, 30: 45, 31: 65, 32: 65, 33: 65}
});
var zun_sup = prepare({
    type: "zun-excellent",
    stats: {0: 60, 1: 82, 2: 100, 26: 82, 27: 82, 28: 82, 29: 82, 30: 60, 31: 82, 32: 82, 33: 82}
});

var search = new Search({possibilities, current: [[-1, 0, 0, 0, 0], [0, 0, 0, 0, 0]]});
var amber = new Array(10).fill(zun_sup);
var best;
var best_fitness = 0;

function fitness(mats) {
    var result = craft(mats);

    var Stat_SAP_LOAD = 2;
    var Stat_DODGE = 6;
    var Stat_ELEMENTAL_CASTING_SPEED = 26;
    var sap = result[Stat_SAP_LOAD];
    var dodge = result[Stat_DODGE];
    var magic = Math.floor(20 + 80 * result[Stat_ELEMENTAL_CASTING_SPEED]);

    return magic * 100 + sap + dodge;
}

var i = 0;
var current;
var found = [];
while (current = search.next()) {
    ++i;
    if (i > 500000) {
        console.log("searching", search.current);
        i = 0;
    }

    current = current.concat(amber);
    var current_fitness = fitness(current);
    if (current_fitness >= best_fitness) {
        found.push({fitness: current_fitness, mats: current.map(mat=>mat.type)});
    }

    if (current_fitness > best_fitness) {
        best_fitness = current_fitness;
        best = current;
        var mats = best.slice(0, 13).map(mat => mat.type);
        console.log("best", "mats\n", mats, "craft", craft(best), "fitness", best_fitness);
        console.log("next", search.current);
    }
}

var mats = best.slice(0, 13).map(mat => mat.type);
console.log("best", "mats\n", mats, "craft", craft(best), "fitness", best_fitness);

//console.log(craft([
//    oath_basic,oath_choice,perfling_basic,perfling_basic,perfling_basic,perfling_basic,
//    dzao_basic,dzao_basic,dzao_basic,buo_fine,buo_fine,buo_fine
//].concat(new Array(15).fill(zun))));
