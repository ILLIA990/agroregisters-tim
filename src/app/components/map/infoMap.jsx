"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import backupData from "@/app/data/localGeoData.json";
import "@/app/styles/style.css";
import { Skeleton } from "antd";

const InfoMap = () => {
    const t = useTranslations("InfoMap");
    const [statistics, setStatistics] = useState({});
    const [error, setError] = useState(false);
    const [totals, setTotals] = useState({ totalreceipts: 0, totalamountreceipts: 0, lenders: 0 });
    const [loading, setLoading] = useState(true);
    const [isClient, setIsClient] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(null);

    useEffect(() => {
        setIsClient(true);

        const processRegions = (regions) => {
            const totalAmount = regions.reduce((sum, r) => sum + r.totalamountreceipts, 0);
            return regions.reduce((acc, region) => {
                const marketshare = totalAmount > 0 ? (region.totalamountreceipts / totalAmount) * 100 : 0;
                acc[region.id] = { ...region, marketshare };
                return acc;
            }, {});
        };

        const handleData = (data, fromAPI = false) => {
            setTotals({
                totalreceipts: data.totalreceipts,
                totalamountreceipts: data.totalamountreceipts,
                lenders: data.lenders,
            });

            setStatistics(processRegions(data.regions));
            if (fromAPI) {
                setLastUpdated(new Date());
            }
        };

        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetch("/api/crop-stat");
                if (!res.ok) throw new Error("Network Error");
                const data = await res.json();
                handleData(data, true);
            } catch {
                const totalBackup = backupData.totalamountreceipts;
                handleData({
                    ...backupData,
                    regions: backupData.regions,
                    totalreceipts: backupData.totalreceipts,
                    totalamountreceipts: totalBackup,
                    lenders: backupData.lenders || 0,
                });
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const formatUADate = (date) => {
        return date.toLocaleDateString("uk-UA", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    const formatAmountUAH = (amount) => {
        return `₴${new Intl.NumberFormat("uk-UA").format(Math.floor(amount))}`;
    };

    if (!isClient) return null;

    return (
			<div className='page'>
				<div className='infoBigBlock'>
					<div className='infoLittleBlock'>
						<h1>{t('totalStatistics')}</h1>

						<div className='info-time'>
							{lastUpdated ? (
								<h5>
									{t('asOf')} {formatUADate(lastUpdated)}
								</h5>
							) : (
								<Skeleton.Input style={{ width: 120 }} active size='small' />
							)}
						</div>

						<div className='info-grid'>
							{loading ? (
								Array.from({ length: 5 }).map((_, i) => (
									<Skeleton
										key={i}
										active
										style={{ width: 200, height: 120, marginBottom: 24 }}
									/>
								))
							) : (
								<>
									<div className='info-card'>
										<div className='info-card-block'>
											<h3 className='value'>
												{totals.totalreceipts.toLocaleString('uk-UA')}
											</h3>
											<h2 className='label'>{t('issuedReceipts')}</h2>
										</div>
										<img
											src='/a-very-simplified-icon-of-a-contract.svg'
											alt=''
										/>
									</div>

									<div className='info-card'>
										<div className='info-card-block'>
											<h3 className='value'>
												{formatAmountUAH(totals.totalamountreceipts)}
											</h3>
											<h2 className='label'>{t('totalValue')}</h2>
										</div>
										<img
											src='/a-very-simplified-icon-of-a-dollar-coin.svg'
											alt=''
										/>
									</div>

									<div className='info-card'>
										<div className='info-card-block'>
											<h3 className='value'> &gt;4 000</h3>
											<h2 className='label'>{t('fundedProducers')}</h2>
										</div>
										<img
											src='/a-very-simplified-icon-of-a-sprout--no-black-stand.svg'
											alt=''
										/>
									</div>

									<div className='info-card'>
										<div className='info-card-block'>
											<h3 className='value'>
												&gt;{totals.lenders.toLocaleString('uk-UA')}
											</h3>
											<h2 className='label'>{t('financingLenders')}</h2>
										</div>
										<img src='/R.svg' alt='' />
									</div>

									<div className='info-card'>
										<div className='info-card-block'>
											<h3 className='value'>47</h3>
											<h2 className='label'>{t('productNames')}</h2>
										</div>
										<img src='/a-few-ears-of-wheat.svg' alt='' />
									</div>
								</>
							)}
						</div>

						<div className='diagram-card'>
							<img src='/tbd-statistics.png' alt='TBD' />
						</div>
					</div>
				</div>
			</div>
		)
};

export default InfoMap;
