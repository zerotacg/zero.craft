import React from 'react';
import './App.css';
import ItemInfoDialog from './components/ItemInfo';
import LanguageSelector from './components/LanguageSelector';
import MainInterface from './components/MainInterface';
import MaterialSelection from './components/MaterialSelection';
import QuantitySelection from './components/QuantitySelection';
import {Provider as CraftProvider} from './craft/CraftContext';
import {Provider as InfoProvider} from './info/InfoContext';

export default function App() {
    return (
        <div className="App">
            <InfoProvider>
                <CraftProvider>
                    <LanguageSelector/>
                    <ItemInfoDialog/>
                    <MaterialSelection/>
                    <QuantitySelection/>
                    <MainInterface/>
                </CraftProvider>
            </InfoProvider>
        </div>
    );
}
