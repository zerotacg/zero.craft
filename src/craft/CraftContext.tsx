import React, {createContext, ReactNode, useState} from "react";
import {TSlot} from "./TSlot";

export interface State {
    slots: any[];
}

export interface Service {
    addSlot: (slot: TSlot) => void;
    removeSlot: (slot: TSlot) => void;
    toggleSlot: (slot: TSlot) => void;
}

const initialState = {slots: []};
const nop = () => {
};
const nopService = {addSlot: nop, removeSlot: nop, toggleSlot: nop};

export const Context = createContext<State & Service>({...initialState, ...nopService});

export interface Props {
    children?: ReactNode;
}

export const Provider: React.FC<Props> = (props) => {
    const [slots, setSlots] = useState<State["slots"]>([]);

    function addSlot(slot: TSlot) {
        setSlots((slots) => {
            const newSlots = [...slots];
            newSlots[slot] = [];
            return newSlots;
        })
    }

    function removeSlot(slot: TSlot) {
        setSlots((slots) => {
            const newSlots = [...slots];
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
        (window as any).slotAddRemove(slot);
    }

    return (<Context.Provider value={{
        slots,
        addSlot,
        removeSlot,
        toggleSlot,
    }} {...props} />)
}

export default Context;
