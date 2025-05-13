import React, {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {type SItem} from '~/craft/SItem';
import {TSlot} from '~/craft/TSlot';
import InfoContext from "~/info/InfoContext";
import Sheet from "./Sheet";
import Icon from "./Icon";
import {SLOTS} from "~/craft/Slots";
import {useMaterial} from "~/data/MaterialsContext";

interface ItemInfoProps {
    material: SItem;
    slot: TSlot;
}

const STAT_COUNT = 34;

const ItemInfo: React.FC<ItemInfoProps> = ({material, slot}) => {
    const {t} = useTranslation();
    const {show} = useContext(InfoContext);
    const slotData = SLOTS[slot];
    const sheetId = material.sheet_id;
    const {color, family, quality, data: craftData} = material.craft;
    const currentCraftData = craftData[slot];
    const stats = new Array(STAT_COUNT).fill(0)
        .map((_, index) => index)
        .filter((slot: TSlot) => slotData.stat.indexOf(slot) > -1)
    ;

    return (
        <>
            <div className="hstack align-items-start">
                <div className="vstack">
                    <div>{t('uiSheetID')}: {sheetId}</div>
                    <div>{t('uiQuality')}: Q{quality}</div>
                    <div>{t('uiFamily')}: {t(`mpfam${family}`)}</div>
                    <div>{t('uiColor')}: {t(`mpcol${color}`)}</div>
                </div>
                <div className="ms-auto">
                    <Sheet sheetId={sheetId}/>
                </div>
            </div>

            {t('uiAllItemParts')}
            <br/>
            <div>
                <Icon icon={slotData.icon}/>

                <select
                    value={slot}
                    onChange={(e) => {
                        show(sheetId, e.target.value as unknown as TSlot);
                    }}
                >
                    {Object.keys(craftData).map((slot) => (
                        <option key={slot} value={slot}>{t(SLOTS[slot as unknown as TSlot]?.label)}</option>
                    ))}
                </select>
                <div className="container">
                    {t('uiEcosystem')}: <label>{t(`iompf${currentCraftData.ecosystem}`)}</label><br/>
                    {stats.map((stat) => (
                        <div key={stat} className="row align-items-center">
                            <div className="col-4">{t(`mpstat${stat}`)}</div>
                            <div className="col-6">
                                <div className="col progress">
                                    <div className="progress-bar" role="progressbar"
                                         style={{width: `${currentCraftData.stat[stat]}%`}}
                                         aria-valuenow={currentCraftData.stat[stat]}
                                         aria-valuemin={0}
                                         aria-valuemax={100}/>
                                </div>
                            </div>
                            <div className="col-2">{currentCraftData.stat[stat]}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

const ItemInfoDialog: React.FC = () => {
    const {t} = useTranslation();
    const {sheetId, slot, close} = useContext(InfoContext);
    const material = useMaterial(sheetId ?? 0);
    const selectedSlot = slot ?? Object.keys(material?.craft?.data ?? [])[0] as unknown as TSlot;

    if (material === undefined) {
        return null;
    }

    return (
        <div className="modal item_info" tabIndex={-1} role="dialog" style={{display: 'block'}}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{t('uiSheetID')}: {sheetId}</h5>
                        <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close" onClick={close}/>
                    </div>
                    <div className="modal-body">
                        <ItemInfo material={material} slot={selectedSlot}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemInfoDialog;
