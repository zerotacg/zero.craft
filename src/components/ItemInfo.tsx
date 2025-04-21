import React, {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {SItem, SITEMS} from '../craft/SItem';
import {TSlot} from '../craft/TSlot';
import InfoContext from "../info/InfoContext";
import Sheet from "./Sheet";
import Icon from "./Icon";
import {SLOTS} from "../craft/Slots";

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
            <div
                style={{
                    width: '338px',
                    margin: '10px',
                    border: 0,
                    position: 'relative'
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        left: '286px',
                        top: '0px'
                    }}
                ><Sheet sheetId={sheetId}/></div>

                {t('uiSheetID')}: <label>{sheetId}</label><br/>
                {t('uiQuality')}: <label>Q{quality}</label><br/>
                {t('uiFamily')}: <label>{t("mpfam" + family)}</label><br/>
                {t('uiColor')}: <label>{t("mpcol" + color)}</label><br/>
                <br/>

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
            </div>
        </>
    );
};

const ItemInfoDialog: React.FC = () => {
    const {t} = useTranslation();
    const {sheetId, slot, close} = useContext(InfoContext);
    const material = sheetId ? SITEMS[sheetId] : undefined;
    const selectedSlot = slot ?? Object.keys(material?.craft?.data ?? [])[0] as unknown as TSlot;

    if (material === undefined) {
        return null;
    }

    return (
        <div className="modal item_info" tabIndex={-1} role="dialog" style={{display: 'unset'}}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{t('uiSheetID')}: {sheetId}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={close}>
                            <span aria-hidden="true">&times;</span>
                        </button>
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
