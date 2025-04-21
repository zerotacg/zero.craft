import React from 'react';
import {useTranslation} from 'react-i18next';

const CraftPreview: React.FC = () => {
    const {t} = useTranslation();

    return (
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
    );
};

export default CraftPreview;
