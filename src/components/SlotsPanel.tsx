import React, {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import CraftContext from '../craft/CraftContext';
import {TSlot} from "../craft/TSlot";
import Icon from "./Icon";
import {SLOTS} from "../craft/Slots";
import './SlotsPanel.css';


const SlotsPanel: React.FC = () => {
    const slots = SLOTS;
    const {t} = useTranslation();
    const {toggleSlot} = useContext(CraftContext);

    return (
        <div className="slots-panel">
            {t('uiSlotsTitle')}
            <div className="vstack">
                {Object.entries(slots).map(([key, value]) => (
                    <button key={key} type="button" className="slots-panel-item btn"
                            onClick={(e) => {
                                e.preventDefault();
                                toggleSlot(key as unknown as TSlot);
                            }}>
                        <Icon icon={value.icon} label={value.label}/>
                        {t(value.label)}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SlotsPanel;
