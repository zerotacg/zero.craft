import React, {useContext} from 'react';
import {useTranslation} from "react-i18next";
import CraftContext from "../craft/CraftContext";
import {SItems} from "../craft/SItem";
import {TSlot} from '../craft/TSlot';
import Sheet from './Sheet';

interface MaterialsProps {
    slot: TSlot;
}

const Materials: React.FC<MaterialsProps> = ({slot}) => {
    const {t} = useTranslation();
    const sheetItems: SItems = (window as any).SItems;
    const materials = Object.values(sheetItems)
        .filter(sheet => sheet.craft.part & Math.pow(2, slot));

    return (
        <>
            {materials.map((sheet) => (
                <div key={sheet.sheet_id} className="col">
                    <Sheet sheetId={sheet.sheet_id}/>
                </div>
            ))}
        </>
    );
};


const MaterialSelection: React.FC = () => {
    const {selectedSlot} = useContext(CraftContext);

    return (
        <div
            id="ui:interface:material_selection"
            style={{
                top: '0px',
                position: 'absolute',
                display: 'none',
                minWidth: '10px',
                minHeight: '10px',
                border: '1px solid',
                backgroundColor: '#333333'
            }}
        >
            <table>
                <tbody>
                </tbody>
            </table>
            <div className="container">
                <div className="row">
                    {(selectedSlot !== undefined) && (
                        <Materials slot={selectedSlot}/>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MaterialSelection;
