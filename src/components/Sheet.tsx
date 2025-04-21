import React from "react";
import {useTranslation} from "react-i18next";
import {SItems} from "../craft/SItem";
import Icon from "./Icon";

export interface Props {
    sheetId: number;
    quantity?: number;
}

export const Sheet: React.FC<Props> = ({sheetId, quantity}) => {
    const {t} = useTranslation();
    const global_SItems: SItems = (window as any).SItems;
    const global_Sheets = (window as any).Sheets;
    const title = t(global_Sheets[sheetId]) + ".name"; // TODO: translate using item_words
    const {icon, craft} = global_SItems[sheetId];

    return (
        <div className={"sheet"} title={title}>
            {Object.values(icon.texture).map((texture) => (
                <Icon key={texture} icon={texture}/>
            ))}
            <div className="text">{icon.text.toUpperCase()}</div>
            {craft.quality !== 0 && <div className="quality">{craft.quality}</div>}
            {quantity !== undefined && <div className="quantity">{quantity}</div>}
        </div>
    );
};

export default Sheet;
