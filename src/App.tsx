import React from 'react';
import {useTranslation} from 'react-i18next';
import './App.css';

export default function App() {
    const {t} = useTranslation();

    return (
        <div className="App">
            {t("uiLanguageName")}
        </div>
    );
}
