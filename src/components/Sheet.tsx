import React, {ComponentProps} from "react";
import {useTranslation} from "react-i18next";
import {SITEMS} from "../craft/SItem";
import Icon from "./Icon";
import './Sheet.css';
import {SHEETS} from "../craft/Sheets";

export interface Props extends ComponentProps<'div'> {
    sheetId: number;
    quantity?: number;
}

export const Sheet: React.FC<Props> = ({sheetId, quantity, ...props}) => {
    const {t} = useTranslation();
    const sheetName = SHEETS[sheetId].split(".sitem")[0];
    const {icon, craft} = SITEMS[sheetId];
    const title = t(`${sheetName}.name`, {ns: "item_words"});

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
