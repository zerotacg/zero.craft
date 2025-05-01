import {createContext, useContext} from "react";
import type {SItem} from "../craft/SItem";


export type State = SItem[];
const initialState: State = [];

export const Context = createContext<State>(initialState);

export function useMaterials() {
    return useContext(Context);
}

export function useMaterial(sheetId: number) {
    return useContext(Context).find(({sheet_id}) => sheet_id === sheetId);
}

export default Context;
