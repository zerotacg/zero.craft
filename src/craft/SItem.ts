import {TSlot} from "./TSlot";

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
