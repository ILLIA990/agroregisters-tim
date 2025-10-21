import React from "react";
import '@/app/styles/style.css'
const RegionList = ({ regions, t, formatAmountUAH, getColorByMarketShare }) => {
    if (!regions) return null;

    return (
        <div className="region-list">
            {Object.values(regions).map((region) => (
                <div
                    className="map-tooltip"
                    key={region.id}
                >
                    <header className="map-tooltip-header">
                        <strong>{region.name}</strong>
                        <div
                            className="market-share-number"
                            style={{
                                backgroundColor: getColorByMarketShare(region.marketshare),
                                color: region.marketshare < 4 ? "#22252E" : "#ffffff",
                            }}
                        >
                            {region.marketshare?.toFixed(2)}%
                        </div>
                    </header>
                    <div>
                        <div className="mini-data">
                            <p>{t("receiptsCount")}:</p>
                            {region.totalreceipts}
                        </div>
                        <div className="mini-data">
                            <p>{t("amount")}:</p>
                            {formatAmountUAH(region.totalamountreceipts)}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RegionList;
