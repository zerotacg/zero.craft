import React, {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import CraftContext from '../craft/CraftContext';
import {TSlot} from "../craft/TSlot";
import Icon from "./Icon";
import {SLOTS} from "../craft/Slots";


const SlotsPanel: React.FC = () => {
    const slots = SLOTS;
    const {t} = useTranslation();
    const {toggleSlot} = useContext(CraftContext);

    return (
        <div style={{
            border: '1px',
            borderStyle: 'solid'
        }}>
            {t('uiSlotsTitle')}
            <table>
                <tbody>
                {Object.entries(slots).map(([key, value]) => (
                    <tr key={key}>
                        <td>
                            <Icon icon={value.icon} label={value.label}/>
                            <a href="#" onClick={(e) => {
                                e.preventDefault();
                                toggleSlot(key as unknown as TSlot);
                            }}>{t(value.label)}</a>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default SlotsPanel;
