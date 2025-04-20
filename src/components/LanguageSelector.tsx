import React from 'react';
import {useTranslation} from 'react-i18next';

const LanguageSelector: React.FC = () => {
    const {t, i18n} = useTranslation();

    const changeLanguage = (lang: string) => {
        // Call the existing JavaScript function to maintain compatibility
        (window as any).loadTranslations(lang);

        // Also change the language in i18n
        i18n.changeLanguage(lang);
    };

    return (
        <div
            id="ui:interface:main:language"
            style={{
                marginLeft: '4px',
                paddingLeft: '1%',
                position: 'relative'
            }}
        >
            <a
                id="ui:interface:language:en"
                href="#"
                onClick={(e) => {
                    e.preventDefault();
                    changeLanguage('en');
                }}
            >
                <img src="./textures/en.png" title="English" alt="English flag"/>
            </a>
            <a
                id="ui:interface:language:de"
                href="#"
                onClick={(e) => {
                    e.preventDefault();
                    changeLanguage('de');
                }}
            >
                <img src="./textures/de.png" title="Deutsch" alt="German flag"/>
            </a>
            <a
                id="ui:interface:language:fr"
                href="#"
                onClick={(e) => {
                    e.preventDefault();
                    changeLanguage('fr');
                }}
            >
                <img src="./textures/fr.png" title="Français" alt="French flag"/>
            </a>
            <div className="text">{t('uiLanguageName')}</div>
        </div>
    );
};

export default LanguageSelector;
