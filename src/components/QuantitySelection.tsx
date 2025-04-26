import React, {useContext, useState} from 'react';
import {useTranslation} from 'react-i18next';
import CraftContext from "../craft/CraftContext";
import {TSlot} from "../craft/TSlot";
import Sheet from './Sheet';

interface QuantitySelectionProps {
    slot: TSlot;
    sheetId: number;
}

const QuantitySelection: React.FC<QuantitySelectionProps> = ({slot, sheetId}) => {
    const {t} = useTranslation();
    const {slots, quantitySelected, cancelQuantitySelection, removeMaterial} = useContext(CraftContext);
    const currentQuantity: number = slots[slot]?.[sheetId] ?? 0;
    const [quantity, setQuantity] = useState(currentQuantity);

    return (
        <div
            style={{
                width: '187px',
                height: '105px',
                top: '0px',
                zIndex: 1,
                position: 'absolute',
                border: '1px solid',
                backgroundColor: '#333333'
            }}
        >
            <div className="text">{t('uiSelectQuantity')}</div>
            <div
                style={{
                    position: 'absolute',
                    left: '43px',
                    top: '30px'
                }}
            >
                <Sheet sheetId={sheetId}/>
            </div>

            <input
                type="text"
                maxLength={3}
                size={2}
                defaultValue={currentQuantity}
                autoFocus
                style={{
                    position: 'absolute',
                    left: '103px',
                    top: '40px'
                }}
                onChange={(event) => {
                    setQuantity(parseInt(event.target.value))
                }}
            />

            <input
                type="button"
                value="remove"
                style={{
                    position: 'absolute',
                    left: '3px',
                    top: '80px'
                }}
                onClick={() => {
                    removeMaterial(slot, sheetId)
                }}
            />

            <input
                type="button"
                value="ok"
                style={{
                    position: 'absolute',
                    left: '83px',
                    top: '80px'
                }}
                onClick={() => {
                    quantitySelected(quantity)
                }}
            />

            <input
                type="button"
                value="cancel"
                style={{
                    position: 'absolute',
                    left: '123px',
                    top: '80px'
                }}
                onClick={cancelQuantitySelection}
            />
        </div>
    );
};

const QuantitySelectionDialog: React.FC = () => {
    const {quantitySelection} = useContext(CraftContext);

    return (
        <>
            {(quantitySelection !== undefined) && (
                <QuantitySelection {...quantitySelection} />
            )}
        </>
    );
};

export default QuantitySelectionDialog;
