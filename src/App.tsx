import React from 'react';
import './App.css';
import ItemInfo from './components/ItemInfo';
import LanguageSelector from './components/LanguageSelector';
import MaterialSelection from './components/MaterialSelection';

export default function App() {
    return (
        <div className="App">
            <LanguageSelector/>
            <ItemInfo/>
            <MaterialSelection/>
        </div>
    );
}
