import React from 'react';
import './App.css';
import ItemInfo from './components/ItemInfo';
import LanguageSelector from './components/LanguageSelector';

export default function App() {
    return (
        <div className="App">
            <LanguageSelector/>
            <ItemInfo/>
        </div>
    );
}
