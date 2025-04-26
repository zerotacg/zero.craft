import React from 'react';
import {useTranslation} from 'react-i18next';
import CraftItemList from './CraftItemList';
import CraftPreview from './CraftPreview';
import SlotsPanel from './SlotsPanel';

const MainInterface: React.FC = () => {
    const {t} = useTranslation();

    return (
        <div className="container-xl">
            <SlotsPanel/>

            <div style={{
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

                <CraftItemList/>
                <CraftPreview/>
            </div>
        </div>
    );
};

export default MainInterface;
