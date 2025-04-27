import {TSlot} from "./TSlot";
import data from '~/data/materials';

export interface IconData {
    text: string;
    texture: {
        [layer: number]: string;
    };
}

export interface CraftData {
    part: number;
    quality: number;
    purity: number;
    family: number;
    color: number;
    data: {
        [slotId in TSlot]: {
            ecosystem: number;
            stat: {
                [statId: string]: number;
            };
        };
    };
}

export interface SItem {
    sheet_id: number;
    icon: IconData;
    craft: CraftData;
}

export type SItems = {
    [sheetId: string]: SItem;
}

export const SITEMS: SItems = (data as SItems);
export default (data as SItems);
