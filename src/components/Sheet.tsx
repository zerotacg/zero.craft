import React, {ComponentProps} from "react";
import {useTranslation} from "react-i18next";
import Icon from "./Icon";
import './Sheet.css';
import SHEETS from "../craft/Sheets";
import {useMaterial} from "../data/MaterialsContext";

export interface Props extends ComponentProps<'div'> {
    sheetId: number;
    quantity?: number;
}

export const Sheet: React.FC<Props> = ({sheetId, quantity, ...props}) => {
    const {t} = useTranslation();
    // @ts-ignore
    const sheetName = SHEETS[sheetId].split(".sitem")[0];
    const {icon, craft} = useMaterial(sheetId) ?? {icon: {texture: {}}, craft: {}};
    const title = t(`${sheetName}.name`, {ns: "item_words"});

    return (
        <div className={"sheet"} title={title} {...props}>
            {Object.values(icon.texture).map((texture) => (
                <Icon key={texture} icon={texture}/>
            ))}
            <div className="text">{icon.text?.toUpperCase()}</div>
            {craft.quality !== 0 && <div className="quality">{craft.quality}</div>}
            {quantity !== undefined && <div className="quantity">{quantity}</div>}
        </div>
    );
};

export default Sheet;
