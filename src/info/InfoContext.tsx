import React, {createContext, PropsWithChildren, useState} from "react";
import {TSlot} from "../craft/TSlot";
import {nop} from "../utils";

export interface State {
    sheetId?: number;
    slot?: TSlot;
}

export interface Service {
    show: (sheetId: number, slot?: TSlot) => void;
    close: () => void;
}

const initialState: State = {};

const nopService: Service = {
    show: nop,
    close: nop,
};

export const Context = createContext<State & Service>({...initialState, ...nopService});

export const Provider: React.FC<PropsWithChildren> = (props) => {
    const [state, setState] = useState<State>();
    const ah_itemInfo = (window as any).ah_itemInfo;
    const ah_hide = (window as any).ah_hide;

    function show(sheetId: number, slot?: TSlot) {
        setState({sheetId, slot});
        ah_itemInfo(slot, sheetId)
    }

    function close() {
        setState({});
        ah_hide('ui:interface:item_info');
    }

    return (<Context.Provider value={{
        ...state,
        show,
        close,
    }} {...props} />)
}

export default Context;
