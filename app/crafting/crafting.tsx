import {Provider as CraftProvider} from "../craft/CraftContext";
import {Provider as InfoProvider} from "../info/InfoContext";
import ItemInfoDialog from "../components/ItemInfo";
import MaterialSelection from "../components/MaterialSelection";
import QuantitySelection from "../components/QuantitySelection";
import React from "react";
import LanguageSelector from "~/components/LanguageSelector";
import SlotsPanel from "~/components/SlotsPanel";
import CraftItemList from "~/components/CraftItemList";
import CraftPreview from "~/components/CraftPreview";

export function Crafting() {
    return (
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
    );
}
