import React, {ComponentProps} from "react";
import {useTranslation} from "react-i18next";


export interface Props extends ComponentProps<'div'> {
    icon: string;
    label?: string;
}

export const Icon: React.FC<Props> = ({icon, label, ...props}) => {
    const {t} = useTranslation();
    const title = label ? t(label) : undefined;

    return (
        <div className={"texture " + icon} title={title} {...props}/>
    );
};

export default Icon;
