import React, {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import CraftContext from '../craft/CraftContext';
import {TSlot} from "../craft/TSlot";
import Icon from "./Icon";

interface Slot {
    icon: string;
    label: string;
    stat: number[]
}

type Slots = {
    [key in TSlot]: Slot;
};

const SlotsPanel: React.FC = () => {
    const slots: Slots = (window as any).Slots;
    const {t} = useTranslation();
    const {toggleSlot} = useContext(CraftContext);

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
                                toggleSlot(key as unknown as TSlot);
                            }}>{t(value.label)}</a>
                        </td>
                    </tr>))}
                </tbody>
            </table>
        </div>
    );
};

export default SlotsPanel;
