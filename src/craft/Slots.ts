import {TSlot} from "./TSlot";

export interface Slot {
    icon: string;
    label: string;
    stat: number[]
}

export type Slots = {
    [key in TSlot]: Slot;
};

export const SLOTS: Slots = (window as any).Slots;
