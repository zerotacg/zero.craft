import React from 'react';
import {useTranslation} from 'react-i18next';

const LanguageSelector: React.FC = () => {
    const {t, i18n} = useTranslation();

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
    };

    return (
        <div
            style={{
                marginLeft: '4px',
                paddingLeft: '1%',
                position: 'relative'
            }}
        >
            <a
                href="#"
                onClick={(e) => {
                    e.preventDefault();
                    changeLanguage('en');
                }}
            >
                <img src="./textures/en.png" title="English" alt="English flag"/>
            </a>
            <a
                href="#"
                onClick={(e) => {
                    e.preventDefault();
                    changeLanguage('de');
                }}
            >
                <img src="./textures/de.png" title="Deutsch" alt="German flag"/>
            </a>
            <a
                href="#"
                onClick={(e) => {
                    e.preventDefault();
                    changeLanguage('fr');
                }}
            >
                <img src="./textures/fr.png" title="Français" alt="French flag"/>
            </a>
            {t('uiLanguageName')}
        </div>
    );
};

export default LanguageSelector;
