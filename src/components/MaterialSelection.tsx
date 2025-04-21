import React, {useContext} from 'react';
import CraftContext from "../craft/CraftContext";
import {SItems} from "../craft/SItem";
import {TSlot} from '../craft/TSlot';
import Sheet from './Sheet';

interface MaterialsProps {
    slot: TSlot;
}

const Materials: React.FC<MaterialsProps> = ({slot}) => {
    const {setMaterialQuantity} = useContext(CraftContext);
    const sheetItems: SItems = (window as any).SItems;
    const materials = Object.values(sheetItems)
        .filter(sheet => sheet.craft.part & Math.pow(2, slot)); // TODO sort?

    return (
        <>
            {materials.map((sheet) => (
                <div key={sheet.sheet_id} className="col" onClick={() => {
                    setMaterialQuantity(slot, sheet.sheet_id);
                }}>
                    <Sheet sheetId={sheet.sheet_id}/>
                </div>
            ))}
        </>
    );
};


const MaterialSelection: React.FC = () => {
    const {selectedSlot} = useContext(CraftContext);

    return (
        <>
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
            </div>

            {(selectedSlot !== undefined) && (
                <div className="container">
                    <div className="row">
                        <Materials slot={selectedSlot}/>
                    </div>
                </div>
            )}
        </>
    );
};

export default MaterialSelection;
