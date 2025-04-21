import React, {ComponentProps} from "react";
import {useTranslation} from "react-i18next";
import {SITEMS, SItems} from "../craft/SItem";
import Icon from "./Icon";
import './Sheet.css';

export interface Props extends ComponentProps<'div'> {
    sheetId: number;
    quantity?: number;
}

export const Sheet: React.FC<Props> = ({sheetId, quantity, ...props}) => {
    const {t} = useTranslation();
    const SItems: SItems = SITEMS;
    const global_Sheets = (window as any).Sheets;
    const sheetName = global_Sheets[sheetId].split(".sitem")[0];
    const title = t(`${sheetName}.name`, {ns: "item_words"});
    const {icon, craft} = SItems[sheetId];

    return (
        <div className={"sheet"} title={title} {...props}>
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
