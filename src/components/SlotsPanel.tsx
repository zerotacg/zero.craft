import React from 'react';
import {useTranslation} from 'react-i18next';
import {TSlot} from "../craft/TSlot";

interface Slot {
    icon: string;
    label: string;
    stat: number[]
}

type Slots = {
    [key in TSlot]: Slot;
};

interface IconProps {
    icon: string;
    label?: string;
}

const Icon: React.FC<IconProps> = ({icon, label}) => {
    const {t} = useTranslation();
    const title = label ? t(label) : undefined;

    return (
        <div className={"texture " + icon} title={title}>
        </div>
    );
};

const SlotsPanel: React.FC = () => {
    const slots: Slots = (window as any).Slots;
    const {t} = useTranslation();

    return (
        <div style={{
            top: '0px',
            float: 'left',
            width: '18%',
            margin: '3px',
            border: '1px',
            borderStyle: 'solid',
            paddingTop: '1%',
            paddingBottom: '1%',
            paddingLeft: '1%',
            paddingRight: '0'
        }}>
            {t('uiSlotsTitle')}
            <table>
                <tbody>
                {Object.entries(slots).map(([key, value]) =>
                    (<tr key={key}>
                        <td>
                            <Icon icon={value.icon} label={value.label}/>
                            <a href="#" onClick={(e) => {
                                e.preventDefault();
                                (window as any).slotAddRemove(key);
                            }}>{t(value.label)}</a>
                        </td>
                    </tr>))}
                </tbody>
            </table>
        </div>
    );
};

export default SlotsPanel;
