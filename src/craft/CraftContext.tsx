import React, {createContext, PropsWithChildren, useState} from "react";
import {TSlot} from "./TSlot";

export type Slot = {
    [sheetId: string]: number;
}

export type Slots = {
    [slot in TSlot]?: Slot;
};

export interface State {
    slots: Slots;
    selectedSlot?: TSlot;
}

export interface Service {
    addSlot: (slot: TSlot) => void;
    removeSlot: (slot: TSlot) => void;
    toggleSlot: (slot: TSlot) => void;
    setMaterialQuantity: (slot: TSlot, sheetId: number, count?: number) => void;
    selectMaterial: (slot: TSlot) => void;
}

const initialState: State = {slots: {}};
const nop = () => {
};
const nopService = {addSlot: nop, removeSlot: nop, toggleSlot: nop, setMaterialQuantity: nop, selectMaterial: nop};

export const Context = createContext<State & Service>({...initialState, ...nopService});

export const Provider: React.FC<PropsWithChildren> = (props) => {
    const [slots, setSlots] = useState<State["slots"]>({});
    const [selectedSlot, setSlotSelection] = useState<State["selectedSlot"]>();
    const global_craft_slots_used = (window as any).craft_slots_used;
    const global_materials = (window as any).materials;
    const global_loadMaterials = (window as any).loadMaterials;
    const global_updateItemList = (window as any).updateItemList;
    const ah_setMaterialQuantity = (window as any).ah_setMaterialQuantity;
    const ah_selectMaterial = (window as any).ah_selectMaterial;

    function addSlot(slot: TSlot) {
        setSlots((slots) => {
            const newSlots = {...slots};
            newSlots[slot] = {};
            return newSlots;
        })
    }

    function removeSlot(slot: TSlot) {
        setSlots((slots) => {
            const newSlots = {...slots};
            delete newSlots[slot];
            return newSlots;
        })
    }

    function toggleSlot(slot: TSlot) {
        if (slots[slot]) {
            removeSlot(slot);
        } else {
            addSlot(slot);
        }

        // TODO remove once state is handled in context
        if (global_craft_slots_used[slot]) {
            delete (global_craft_slots_used[slot]);
        } else {
            global_craft_slots_used[slot] = [];

            if (global_materials[slot] == null) {
                global_loadMaterials(slot);
            }
        }
        global_updateItemList();
    }

    function setMaterialQuantity(slot: TSlot, sheetId: number, count: number = 1) {
        setSlots((slots) => {
            const newSlot: Slot = slots[slot] || {};
            const newSlots = {...slots, [slot]: newSlot};
            if (count <= 0) {
                delete newSlot[sheetId];
            } else {
                newSlot[sheetId] = count;
            }
            return newSlots;
        })
        ah_setMaterialQuantity();
    }

    function selectMaterial(slot: TSlot) {
        setSlotSelection(slot);
        ah_selectMaterial(slot);
    }

    return (<Context.Provider value={{
        slots,
        selectedSlot,
        addSlot,
        removeSlot,
        toggleSlot,
        setMaterialQuantity,
        selectMaterial,
    }} {...props} />)
}

export default Context;
