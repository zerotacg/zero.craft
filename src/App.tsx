import React from 'react';
import './App.css';
import ItemInfoDialog from './components/ItemInfo';
import LanguageSelector from './components/LanguageSelector';
import MaterialSelection from './components/MaterialSelection';
import QuantitySelection from './components/QuantitySelection';
import {Provider as CraftProvider} from './craft/CraftContext';
import {Provider as InfoProvider} from './info/InfoContext';
import SlotsPanel from "./components/SlotsPanel";
import CraftItemList from "./components/CraftItemList";
import CraftPreview from "./components/CraftPreview";

export default function App() {
    return (
        <div className="App">
            <InfoProvider>
                <CraftProvider>
                    <ItemInfoDialog/>
                    <MaterialSelection/>
                    <QuantitySelection/>
                    <div className="container-xxl">
                        <div className="row">
                            <LanguageSelector/>
                        </div>
                        <div className="row">
                            <div className="col-2"><SlotsPanel/></div>
                            <div className="col-5"><CraftItemList/></div>
                            <div className="col-5"><CraftPreview/></div>
                        </div>
                    </div>
                </CraftProvider>
            </InfoProvider>
        </div>
    );
}
