import React, {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import CraftContext from "../craft/CraftContext";
import {calculateCraftResult} from "../craft/CraftResult";

const CraftPreview: React.FC = () => {
    const {t} = useTranslation();
    const {slots} = useContext(CraftContext);
    const result = calculateCraftResult(slots);

    return (
        <>
            <div style={{
                top: '0px',
                float: 'left',
                width: '48%',
                margin: '3px',
                border: '1px solid',
                paddingBottom: '2%'
            }}>
                {t('uiPreviewTitle')}
                <div className="container">
                    <div className="row">
                        <div className="col">
                            max: {Math.floor(result.max * 100 * 1000) / 1000}
                        </div>
                        <div className="col">
                            avg: {Math.floor(result.average * 100 * 1000) / 1000}
                        </div>
                        <div className="col">
                            max - avg: {Math.floor((result.max - result.average) * 100 * 1000) / 1000}
                        </div>
                        <div className="col">
                            m: {Math.floor(result.m * 100) / 100}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            Color: {t("mpcol" + result.color)}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            Class: {t("uiItemRMClass" + result.purity)}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <table>
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
