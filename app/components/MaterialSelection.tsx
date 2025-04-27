import React, {useContext} from 'react';
import CraftContext from "../craft/CraftContext";
import SItems from '~/craft/SItem';
import {TSlot} from '~/craft/TSlot';
import Sheet from './Sheet';

interface MaterialsProps {
    slot: TSlot;
}

const Materials: React.FC<MaterialsProps> = ({slot}) => {
    const {materialSelected} = useContext(CraftContext);
    const materials = Object.values(SItems)
        .filter(sheet => sheet.craft.part & Math.pow(2, slot)); // TODO sort?

    return (
        <>
            {materials.map(({sheet_id}) => (
                <div key={sheet_id} className="col" onClick={() => {
                    materialSelected(sheet_id);
                }}>
                    <Sheet sheetId={sheet_id}/>
                </div>
            ))}
        </>
    );
};


const MaterialSelection: React.FC = () => {
    const {selectedSlot} = useContext(CraftContext);

    if (selectedSlot === undefined) {
        return null;
    }

    return (
        <div className="modal d-block" tabIndex={-1} role="dialog">
            <div className="modal-dialog modal-xl" role="document">
                <div className="modal-content">
                    <div className="modal-body container-fluid">
                        <div className="row row-cols-auto g-1">
                            <Materials slot={selectedSlot}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MaterialSelection;
