import React, {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {SItem} from '../craft/SItem';
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
    const {show, close} = useContext(InfoContext);
    const slotData = SLOTS[slot];
    const sheetId = material.sheet_id;
    const {color, family, quality, data: craftData} = material.craft;
    const currentCraftData = craftData[slot];
    const stats = new Array(STAT_COUNT).fill(0)
        .map((_, index) => index)
        .filter((slot: TSlot) => slotData.stat.indexOf(slot) > -1)
    ;

    return (
        <div
            className="item_info"
            style={{
                width: '350px',
                left: '10px',
                top: '10px',
                position: 'absolute',
                zIndex: 1,
                border: '1px solid',
                backgroundColor: '#333333'
            }}
        >
            <div
                style={{
                    width: '350px',
                    height: '16px',
                    backgroundColor: '#773333'
                }}
            >
                <div
                    className="texture w_close_1"
                    style={{
                        position: 'relative',
                        left: '336px',
                        top: '2px'
                    }}
                    onClick={close}
                ></div>
            </div>
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
        </div>
    );
};

const ItemInfoDialog: React.FC = () => {
    const {t} = useTranslation();
    const {sheetId, slot, close} = useContext(InfoContext);
    const material = sheetId ? (window as any).SItems[sheetId] : undefined;
    const selectedSlot = slot ?? Object.keys(material?.craft.data)[0] as unknown as TSlot;

    return (
        <>
            <div
                id="ui:interface:item_info"
                className="item_info"
                style={{
                    width: '350px',
                    left: '10px',
                    top: '10px',
                    position: 'absolute',
                    zIndex: 1,
                    display: 'none',
                    border: '1px solid',
                    backgroundColor: '#333333'
                }}
            >
                <div
                    id="ui:interface:item_info:header_opened"
                    style={{
                        width: '350px',
                        height: '16px',
                        backgroundColor: '#773333'
                    }}
                >
                    <div
                        id="ui:interface:header_opened:close"
                        className="texture w_close_1"
                        style={{
                            position: 'relative',
                            left: '336px',
                            top: '2px'
                        }}
                        onClick={close}
                    ></div>
                </div>
                <div
                    id="ui:interface:item_info:content"
                    style={{
                        width: '338px',
                        margin: '10px',
                        border: 0,
                        position: 'relative'
                    }}
                >
                    <div
                        id="ui:interface:item_info:content:sheet"
                        style={{
                            position: 'absolute',
                            left: '286px',
                            top: '0px'
                        }}
                    ></div>

                    {t('uiSheetID')}: <label id="ui:interface:item_info:content:lbl_sheet_id"></label><br/>
                    {t('uiQuality')}: <label id="ui:interface:item_info:content:lbl_quality"></label><br/>
                    {t('uiFamily')}: <label id="ui:interface:item_info:content:lbl_family"></label><br/>
                    {t('uiColor')}: <label id="ui:interface:item_info:content:lbl_color"></label><br/>
                    <br/>

                    {t('uiAllItemParts')}
                    <br/>
                    <div>
                        <div
                            id="ui:interface:item_info:content:img_part"
                            className="texture ico_blade"
                        ></div>

                        <select
                            id="ui:interface:item_info:content:item_parts"
                            onChange={(e) => {
                                // Call the existing JavaScript function
                                (window as any).showItemStats(e.target.value);
                            }}
                        ></select>
                        <div>
                            {t('uiEcosystem')}: <label id="ui:interface:item_info:content:lbl_ecosystem"></label><br/>
                            <div id="ui:interface:item_info:content:stats"></div>
                        </div>
                    </div>
                </div>
            </div>
            {material !== undefined && (
                <ItemInfo material={material} slot={selectedSlot}/>
            )}
        </>
    );
};

export default ItemInfoDialog;
