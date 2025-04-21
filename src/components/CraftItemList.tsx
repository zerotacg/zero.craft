import React from 'react';
import {useTranslation} from 'react-i18next';

const CraftItemList: React.FC = () => {
    const {t} = useTranslation();

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
        </div>
    );
};

export default CraftItemList;
