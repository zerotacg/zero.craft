import {TSlot} from "./TSlot";

export interface Slot {
    icon: string;
    label: string;
    stat: number[]
}

export type Slots = {
    [key in TSlot]: Slot;
};

export const SLOTS: Slots = {
    0x00:
        {
            "icon": "ico_blade"
            , "label": "mpftMpL"
            , "stat": [0, 1, 2, 3, 4, 6, 7, 8, 9]
        }
    , 0x01:
        {
            "icon": "ico_hammer"
            , "label": "mpftMpH"
            , "stat": [0, 1, 2, 3, 4, 6, 7, 8, 9]
        }
    , 0x02:
        {
            "icon": "ico_pointe"
            , "label": "mpftMpP"
            , "stat": [0, 1, 2, 3, 4, 6, 7, 8, 9]
        }
    , 0x03:
        {
            "icon": "ico_shaft"
            , "label": "mpftMpM"
            , "stat": [0, 1, 2, 3, 4, 6, 7, 8, 9]
        }
    , 0x04:
        {
            "icon": "ico_gripp"
            , "label": "mpftMpG"
            , "stat": [0, 1, 2, 4, 6, 7, 8, 9]
        }
    , 0x05:
        {
            "icon": "ico_counterweight"
            , "label": "mpftMpC"
            , "stat": [0, 1, 2, 4, 6, 7, 8, 9]
        }
    , 0x06:
        {
            "icon": "ico_trigger"
            , "label": "mpftMpGA"
            , "stat": [0, 1, 2, 4, 6, 7, 8, 9]
        }
    , 0x07:
        {
            "icon": "ico_firing_pin"
            , "label": "mpftMpPE"
            , "stat": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        }
    , 0x08:
        {
            "icon": "ico_barrel"
            , "label": "mpftMpCA"
            , "stat": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        }
    , 0x09:
        {
            "icon": "ico_explosif"
            , "label": "mpftMpE"
            , "stat": [0, 1, 3, 4, 5]
        }
    , 0x0A:
        {
            "icon": "ico_ammo_jacket"
            , "label": "mpftMpEN"
            , "stat": [0, 1, 4, 5]
        }
    , 0x0B:
        {
            "icon": "ico_ammo_bullet"
            , "label": "mpftMpPR"
            , "stat": [0, 1, 3, 4, 5]
        }
    , 0x0C:
        {
            "icon": "ico_armor_shell"
            , "label": "mpftMpCR"
            , "stat": [0, 1, 6, 7, 10, 11, 12, 13]
        }
    , 0x0D:
        {
            "icon": "ico_lining"
            , "label": "mpftMpRI"
            , "stat": [0, 1, 6, 7, 10, 11, 12, 13]
        }
    , 0x0E:
        {
            "icon": "ico_stuffing"
            , "label": "mpftMpRE"
            , "stat": [0, 1, 6, 7, 10, 11, 12, 13]
        }
    , 0x0F:
        {
            "icon": "ico_armor_clip"
            , "label": "mpftMpAT"
            , "stat": [0, 1, 6, 7, 10, 11, 12, 13]
        }
    , 0x10:
        {
            "icon": "ico_jewel_stone_support"
            , "label": "mpftMpSU"
            , "stat": [0, 1, 21, 22, 23, 24, 25]
        }
    , 0x11:
        {
            "icon": "ico_jewel_stone"
            , "label": "mpftMpED"
            , "stat": [0, 1, 14, 15, 16, 17, 18, 19, 20]
        }
    , 0x18:
        {
            "icon": "ico_clothes"
            , "label": "mpftMpVE"
            , "stat": [0, 1, 6, 7, 10, 11, 12, 13]
        }
    , 0x19:
        {
            "icon": "ico_magic_focus"
            , "label": "mpftMpMF"
            , "stat": [0, 1, 2, 26, 27, 28, 29, 30, 31, 32, 33]
        }
} as Slots;
