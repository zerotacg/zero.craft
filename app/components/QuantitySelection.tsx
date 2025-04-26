import React, {useContext, useState} from 'react';
import {useTranslation} from 'react-i18next';
import CraftContext from "~/craft/CraftContext";
import {TSlot} from "~/craft/TSlot";
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
        <div className="modal d-block" role="dialog">
            <div className="modal-dialog modal-sm">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{t('uiSelectQuantity')}</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={cancelQuantitySelection}/>
                    </div>
                    <div className="modal-body hstack gap-3 justify-content-center">
                        <Sheet sheetId={sheetId}/>
                        <input
                            className="p-1"
                            type="number"
                            min="0"
                            max="999"
                            step="1"
                            inputMode="numeric"
                            autoFocus
                            maxLength={3}
                            size={2}
                            defaultValue={currentQuantity}
                            onChange={(event) => {
                                setQuantity(parseInt(event.target.value))
                            }}
                        />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => {
                            removeMaterial(slot, sheetId)
                        }}>remove
                        </button>
                        <button type="button" className="btn btn-primary" onClick={() => {
                            quantitySelected(quantity)
                        }}>ok
                        </button>
                    </div>
                </div>
            </div>
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
