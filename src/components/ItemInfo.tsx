import React from 'react';
import {useTranslation} from 'react-i18next';

const ItemInfo: React.FC = () => {
    const {t} = useTranslation();

    return (
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
                    onClick={() => {
                        // Call the existing JavaScript function
                        (window as any).ah_hide('ui:interface:item_info');
                    }}
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
    );
};

export default ItemInfo;
