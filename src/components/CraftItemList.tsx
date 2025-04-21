import React, {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import CraftContext, {Slot} from "../craft/CraftContext";
import Icon from "./Icon";
import {SLOTS} from "../craft/Slots";
import {TSlot} from '../craft/TSlot';
import Sheet from "./Sheet";

const MAX_WIDTH = 8;

interface EntryProps {
    slot: TSlot;
    materials: Slot;
}

const Entry: React.FC<EntryProps> = ({slot, materials}) => {
    const {t} = useTranslation();
    const {icon, label} = SLOTS[slot];
    const {selectMaterial} = useContext(CraftContext);

    return (
        <>
            <div className="col-12">
                <Icon icon={icon} label={label}/>
                {t(label)}
            </div>
            {Object.entries(materials).map(([sheetId, quantity]) => (
                <div key={sheetId} className="col" onClick={() => {

                }}>
                    <Sheet sheetId={sheetId as unknown as number} quantity={quantity}/>
                </div>
            ))}
            <div className="col">
                <Icon icon="w_slot_item" onClick={() => {
                    selectMaterial(slot)
                }}/>
            </div>
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
                </tbody>
            </table>
            <div className="container" style={{display: 'none'}}>
                <div className="row">
                    {Object.entries(slots).map(([slot, materials]) => (
                        <Entry key={slot} slot={slot as unknown as TSlot} materials={materials}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CraftItemList;
