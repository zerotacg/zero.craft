import React, {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import CraftContext from "../craft/CraftContext";
import {calculateCraftResult} from "~/craft/CraftResult";
import {useMaterials} from "~/data/MaterialsContext";

const CraftPreview: React.FC = () => {
    const {t} = useTranslation();
    const {slots} = useContext(CraftContext);
    const materials = useMaterials();
    const result = calculateCraftResult(slots, materials);

    return (
        <>
            <div style={{
                border: '1px solid'
            }}>
                {t('uiPreviewTitle')}
                <div className="container">
                    <div className="row">
                        <div className="col">
                            max:
                        </div>
                        <div className="col">
                            {Math.floor(result.max * 100 * 1000) / 1000}
                        </div>
                        <div className="col">
                            avg:
                        </div>
                        <div className="col">
                            {Math.floor(result.average * 100 * 1000) / 1000}
                        </div>
                        <div className="col text-nowrap">
                            max - avg:
                        </div>
                        <div className="col">
                            {Math.floor((result.max - result.average) * 100 * 1000) / 1000}
                        </div>
                        <div className="col">
                            m:
                        </div>
                        <div className="col">
                            {Math.floor(result.m * 100) / 100}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            Color:
                        </div>
                        <div className="col">
                            {t(`mpcol${result.color}`)}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            Class:
                        </div>
                        <div className="col">
                            {t(`uiItemRMClass${result.purity}`)}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <table className="table table-striped table-hover">
                                <thead>
                                <tr>
                                    <th>Stat</th>
                                    <th>before</th>
                                    <th>after</th>
                                    <th>rubarn</th>
                                </tr>
                                </thead>
                                <tbody>
                                {Object.entries(result.stats).map(([mpstat, value]) => (
                                    <tr key={mpstat}>
                                        <td>{t("mpstat" + mpstat)}</td>
                                        <td>{Math.floor(value.before * 100 * 1000) / 1000}</td>
                                        <td>{Math.floor(value.after * 100 * 1000) / 1000}</td>
                                        <td>{Math.floor(value.after * 120 * 1000) / 1000}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CraftPreview;
