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

    quantitySelection?: {
        slot: TSlot;
        sheetId: number;
    };

    itemInfo?: number;
}

export interface Service {
    addSlot: (slot: TSlot) => void;
    removeSlot: (slot: TSlot) => void;
    toggleSlot: (slot: TSlot) => void;
    selectMaterial: (slot: TSlot) => void;
    materialSelected: (slot: TSlot) => void;
    removeMaterial: (slot: TSlot, sheetId: number) => void;

    selectQuantity: (slot: TSlot, sheetId: number) => void;
    quantitySelected: (count: number) => void;
    cancelQuantitySelection: () => void;

    showItemInfo: (slot: TSlot, sheetId: number) => void;
}

const initialState: State = {slots: {}};

function nop() {
}

const nopService: Service = {
    addSlot: nop,
    removeSlot: nop,
    toggleSlot: nop,
    selectMaterial: nop,
    materialSelected: nop,
    removeMaterial: nop,
    selectQuantity: nop,
    quantitySelected: nop,
    cancelQuantitySelection: nop,
    showItemInfo: nop
};

export const Context = createContext<State & Service>({...initialState, ...nopService});

export const Provider: React.FC<PropsWithChildren> = (props) => {
    const [slots, setSlots] = useState<State["slots"]>({});
    const [selectedSlot, setSlotSelection] = useState<State["selectedSlot"]>();
    const [quantitySelection, setQuantitySelection] = useState<State["quantitySelection"]>();
    const [itemInfo, setItemInfo] = useState<State["itemInfo"]>();
    const global_craft_slots_used = (window as any).craft_slots_used;
    const global_materials = (window as any).materials;
    const global_loadMaterials = (window as any).loadMaterials;
    const global_doCraft = (window as any).doCraft;
    const ah_setMaterialQuantity = (window as any).ah_setMaterialQuantity;
    const ah_itemInfo = (window as any).ah_itemInfo;

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
        global_doCraft();
    }

    function selectMaterial(slot: TSlot) {
        setSlotSelection(slot);
    }

    function materialSelected(sheetId: number) {
        if (selectedSlot) {
            setMaterialQuantity(selectedSlot, sheetId);
            setSlotSelection(undefined);
        }
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
        ah_setMaterialQuantity(slot, sheetId, count);
    }

    function removeMaterial(slot: TSlot, sheetId: number) {
        setMaterialQuantity(slot, sheetId, 0);
        setQuantitySelection(undefined);
    }


    function selectQuantity(slot: TSlot, sheetId: number) {
        setQuantitySelection({slot, sheetId});
    }

    function quantitySelected(count: number) {
        if (quantitySelection) {
            setMaterialQuantity(quantitySelection.slot, quantitySelection.sheetId, count);
            setQuantitySelection(undefined);
        }
    }

    function cancelQuantitySelection() {
        setQuantitySelection(undefined);
    }

    function showItemInfo(slot: TSlot, sheetId: number) {
        setItemInfo(sheetId);
        ah_itemInfo(slot, sheetId)
    }

    return (<Context.Provider value={{
        slots,
        selectedSlot,
        quantitySelection,
        itemInfo,
        addSlot,
        removeSlot,
        toggleSlot,
        selectMaterial,
        materialSelected,
        selectQuantity,
        quantitySelected,
        cancelQuantitySelection,
        removeMaterial,
        showItemInfo,
    }} {...props} />)
}

export default Context;
