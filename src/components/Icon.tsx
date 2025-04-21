import React from "react";
import {useTranslation} from "react-i18next";


export interface Props {
    icon: string;
    label?: string;
}

export const Icon: React.FC<Props> = ({icon, label}) => {
    const {t} = useTranslation();
    const title = label ? t(label) : undefined;

    return (
        <div className={"texture " + icon} title={title}/>
    );
};

export default Icon;
