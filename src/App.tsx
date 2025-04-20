import React, {useEffect} from 'react';
import './App.css';
import ItemInfo from './components/ItemInfo';
import LanguageSelector from './components/LanguageSelector';
import MainInterface from './components/MainInterface';
import MaterialSelection from './components/MaterialSelection';
import QuantitySelection from './components/QuantitySelection';
import {Provider as CraftProvider} from './craft/CraftContext';

export default function App() {
    useEffect(() => {
        try {
            (window as any).startZeroCraft();
        } catch (e) {
            console.error("Error starting ZeroCraft:", e);
        }
    }, []);

    return (
        <div className="App">
            <CraftProvider>
                <LanguageSelector/>
                <ItemInfo/>
                <MaterialSelection/>
                <QuantitySelection/>
                <MainInterface/>
            </CraftProvider>
        </div>
    );
}
