export interface StatValues {
    [statId: number]: number;
}

export interface EcosystemData {
    ecosystem: number;
    stat: StatValues;
}

export interface TextureObject {
    [layer: number]: string;
}

export interface IconData {
    texture: TextureObject;
    text: string;
}

export interface CraftData {
    part: number;
    quality: number;
    purity: number;
    family: number;
    color: number;
    data: {
        [slotId: number]: EcosystemData;
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
