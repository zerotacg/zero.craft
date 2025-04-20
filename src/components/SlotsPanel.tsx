import React from 'react';
import { useTranslation } from 'react-i18next';

const SlotsPanel: React.FC = () => {
    const { t } = useTranslation();

    return (
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
    );
};

export default SlotsPanel;
