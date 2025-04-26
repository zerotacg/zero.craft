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

//const initialState: State = {sheetId: 5681454};
const initialState: State = {};

const nopService: Service = {
    show: nop,
    close: nop,
};

export const Context = createContext<State & Service>({...initialState, ...nopService});

export const Provider: React.FC<PropsWithChildren> = (props) => {
    const [state, setState] = useState<State>(initialState);

    function show(sheetId: number, slot?: TSlot) {
        setState({sheetId, slot});
    }

    function close() {
        setState({});
    }

    return (<Context.Provider value={{
        ...state,
        show,
        close,
    }} {...props} />)
}

export default Context;
