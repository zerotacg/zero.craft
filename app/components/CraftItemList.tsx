import React, {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import CraftContext, {type Slot} from "../craft/CraftContext";
import Icon from "./Icon";
import {SLOTS} from "~/craft/Slots";
import {TSlot} from '~/craft/TSlot';
import Sheet from "./Sheet";
import InfoContext from "../info/InfoContext";

interface EntryProps {
    slot: TSlot;
    materials: Slot;
}

const Entry: React.FC<EntryProps> = ({slot, materials}) => {
    const {t} = useTranslation();
    const {icon, label} = SLOTS[slot];
    const {selectMaterial, selectQuantity} = useContext(CraftContext);
    const {show: showItemInfo} = useContext(InfoContext);

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <Icon icon={icon} label={label}/>
                    {t(label)}
                </div>
            </div>
            <div className="row row-cols-auto g-1">
                {Object.entries(materials).map(([sheetId, quantity]) => (
                    <div key={sheetId} className="col">
                        <Sheet
                            sheetId={sheetId as unknown as number}
                            quantity={quantity}
                            onClick={() => {
                                selectQuantity(slot, sheetId as unknown as number)
                            }}
                            onContextMenu={(event) => {
                                event.preventDefault();
                                showItemInfo(sheetId as unknown as number, slot)
                            }}
                        />
                    </div>
                ))}
                <div className="col">
                    <Icon icon="w_slot_item" onClick={() => {
                        selectMaterial(slot)
                    }}/>
                </div>
            </div>
        </div>
    )
}


const CraftItemList: React.FC = () => {
    const {t} = useTranslation();
    const {slots} = useContext(CraftContext);

    return (
        <div style={{
            border: '1px',
            borderStyle: 'solid'
        }}>
            {t('uiItemListTitle')}
            <div className="vstack gap-2">
                {Object.entries(slots).map(([slot, materials]) => (
                    <Entry key={slot} slot={slot as unknown as TSlot} materials={materials}/>
                ))}
            </div>
        </div>
    );
};

export default CraftItemList;
