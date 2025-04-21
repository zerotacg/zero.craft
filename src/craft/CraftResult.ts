import {StatResult} from "./StatResult";
import {Slots as CraftInput} from "./CraftContext";
import {CraftData, SITEMS} from "./SItem";
import {SLOTS} from "./Slots";

export interface CraftResult {
    "color": number,
    "purity": number,
    "max": number,
    "average": number,
    "m": number,
    "x": number,
    "stats": StatResult
}

export function calculateCraftResult(slots_used: CraftInput): CraftResult {
    let mpstat;
    const Slots = SLOTS;
    const SItems = SITEMS;
    let craft_result = {
        "color": 0,
        "purity": 0,
        "max": 0,
        "average": 0,
        "m": 0,
        "x": 0,
        "stats": {}
    };

    const stats: any = {};
    let stat;
    const colors = [0, 0, 0, 0, 0, 0, 0, 0];
    let purity = 0;
    let class_count = 0;
    let quantity = 0;

    for (let slot in slots_used) {
        if (isNaN(Number(slot))) {
            continue;
        }
        for (mpstat = 0; mpstat < 34; ++mpstat) {
            // @ts-ignore
            if (Slots[slot].stat.indexOf(mpstat) == -1) {
                continue;
            }
            if (stats[mpstat]) {
                stat = stats[mpstat];
            } else {
                stat = {
                    before: 0,
                    after: 0,
                    count: 0
                };
            }
            // @ts-ignore
            for (let sheet_id in slots_used[slot]) {
                if (isNaN(Number(sheet_id))) {
                    continue;
                }
                // @ts-ignore
                quantity = slots_used[slot][sheet_id];
                let sitem: CraftData = SItems[sheet_id].craft;

                if (mpstat === 0) {
                    colors[sitem.color as number] += quantity;
                    purity += sitem.purity * quantity;
                    class_count += quantity;
                }
                // @ts-ignore
                stat.before += (sitem.data[slot].stat[mpstat] / 100) * quantity;
                stat.count += quantity;
            }
            stats[mpstat] = stat;
        }
    }
    let max = {before: 0, after: 0};
    let stat_count = 0;
    let sum_before = 0;
    for (mpstat in stats) {
        stat = stats[mpstat];
        ++stat_count;
        if (stat.count != 0) {
            stat.before /= stat.count;
        }
        sum_before += stat.before;
        if (!max) {
            max = stat;
        }
        if (stat.before > max.before) {
            max = stat;
        }
    }
    craft_result.max = max.before;

    let average = 0;
    if (stat_count != 0) {
        average = sum_before / stat_count;
    }
    craft_result.average = average;

    let delta = max.before - average;
    if (delta >= 0.35) {
        max.after += 0.1;
    }
    if (delta < 0.3) {
        delta = 0.3 / delta;
    }
    delta = Math.max(1.00, Math.min(2.00, delta));

    let sum_after = 0;
    let count_less_max = 0;
    let count_greater_min = 0;
    for (mpstat in stats) {
        stat = stats[mpstat];
        stat.after += (stat.before - average) * delta + average;
        stat.after = Math.max(0.00, Math.min(stat.after, 1.00));
        sum_after += stat.after;
        if (stat.after < 1.00) {
            ++count_less_max;
        }
        if (stat.after > 0.00) {
            ++count_greater_min;
        }
    }
    craft_result.m = delta;

    delta = sum_after - sum_before;
    let pass = 0;
    const max_delta = stat_count * 0.001;
    while (Math.abs(delta) > max_delta && pass <= 34) {
        if (delta < 0) {
            delta = -delta / count_less_max;
        }
        if (delta > 0) {
            delta = -delta / count_greater_min;
        }
        sum_after = 0;
        count_less_max = 0;
        count_greater_min = 0;
        for (mpstat in stats) {
            stat = stats[mpstat];
            stat.after = Math.max(0.00, Math.min(stat.after + delta, 1.00));
            sum_after += stat.after;
            if (stat.after < 1.00) {
                ++count_less_max;
            }
            if (stat.after > 0.00) {
                ++count_greater_min;
            }
        }

        delta = sum_after - sum_before;
        console.assert(++pass <= 34);
    }
    if (class_count != 0) {
        purity /= class_count;
    }
    if (purity >= 80) {
        purity = 4;
    } else if (purity >= 65) {
        purity = 3;
    } else if (purity >= 50) {
        purity = 2;
    } else if (purity >= 35) {
        purity = 1;
    } else {
        purity = 0;
    }

    craft_result.color = maxColor(colors);
    craft_result.purity = purity;
    craft_result.stats = stats;

    return craft_result as CraftResult;
}

function maxColor(colors: number[]): number {
    let max = 0;
    let color = 0;
    for (let mpcol in colors) {
        if (colors[mpcol] > max) {
            max = colors[mpcol];
            color = mpcol as unknown as number;
        }
    }
    return color;
}
