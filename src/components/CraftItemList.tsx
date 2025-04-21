import React, {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import CraftContext, {Slot} from "../craft/CraftContext";
import Icon from "./Icon";
import {SLOTS} from "../craft/Slots";
import {TSlot} from '../craft/TSlot';

const MAX_WIDTH = 8;

interface EntryProps {
    slot: TSlot;
    materials: Slot;
}

const Entry: React.FC<EntryProps> = ({slot, materials}) => {
    const {t} = useTranslation();
    const {icon, label} = SLOTS[slot];

    return (
        <>
            <tr>
                <td colSpan={MAX_WIDTH}>
                    <Icon icon={icon} label={label}/>
                    {t(label)}
                </td>
            </tr>
        </>
    )
}


const CraftItemList: React.FC = () => {
    const {t} = useTranslation();
    const {slots} = useContext(CraftContext);

    return (
        <div id="ui:interface:main:craft_window:item_list"
             style={{
                 top: '0px',
                 float: 'left',
                 width: '48%',
                 margin: '3px',
                 border: '1px',
                 borderStyle: 'solid',
                 paddingBottom: '2%'
             }}>
            {t('uiItemListTitle')}
            <table>
                <tbody>
                {Object.entries(slots).map(([slot, materials]) => (
                    <Entry key={slot} slot={slot as unknown as TSlot} materials={materials}/>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CraftItemList;
