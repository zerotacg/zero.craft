import React from 'react';
import {useTranslation} from 'react-i18next';

const MainInterface: React.FC = () => {
    const {t} = useTranslation();

    return (
        <div id="ui:interface:main"
             style={{
                 top: '0px',
                 width: '90%',
                 margin: '0% auto'
             }}>
            <div id="ui:interface:main:slots"
                 style={{
                     top: '0px',
                     float: 'left',
                     width: '18%',
                     margin: '3px',
                     border: '1px',
                     borderStyle: 'solid',
                     paddingTop: '1%',
                     paddingBottom: '1%',
                     paddingLeft: '1%',
                     paddingRight: '0'
                 }}>
                {t('uiSlotsTitle')}
            </div>

            <div id="ui:interface:main:craft_window"
                 style={{
                     top: '0px',
                     float: 'left',
                     width: '78%',
                     margin: '3px',
                     border: '1px',
                     borderStyle: 'solid',
                     paddingTop: '1%',
                     paddingBottom: '1%',
                     paddingLeft: '1%',
                     paddingRight: '0'
                 }}>
                <div>{t('uiCraftWindowTitle')}</div>
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

                <div id="ui:interface:main:craft_window:preview"
                     style={{
                         top: '0px',
                         float: 'left',
                         width: '48%',
                         margin: '3px',
                         border: '1px solid',
                         paddingBottom: '2%'
                     }}>
                    {t('uiPreviewTitle')}
                </div>
            </div>
        </div>
    );
};

export default MainInterface;
