"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import backupData from "@/app/data/localGeoData.json";
import "@/app/styles/style.css";
import { paths } from "@/app/data/mapPaths";
import RegionList from "@/app/components/map/RegionList";

const UkraineMap = () => {
	const t = useTranslations("UkraineMap");

	const [statistics, setStatistics] = useState({});
	const [hoveredRegion, setHoveredRegion] = useState(null);
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
	const [error, setError] = useState(false);
	const [totals, setTotals] = useState({ totalreceipts: 0, totalamountreceipts: 0, lenders: 0 });
	const [loading, setLoading] = useState(true);
	const [isClient, setIsClient] = useState(false);
	const [lastUpdated, setLastUpdated] = useState(null);
	const [selectedYear, setSelectedYear] = useState("all");

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

		if (fromAPI) setLastUpdated(new Date());
	};

	const fetchData = async () => {
		setLoading(true);
		try {
			const url = selectedYear === "all"
				? "/api/crop-stat"
				: `/api/crop-stat?year=${selectedYear}`;

			const res = await fetch(url);
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

	useEffect(() => {
		setIsClient(true);
		fetchData();
	}, [selectedYear]);

	const formatUADate = (date) =>
		date.toLocaleDateString("uk-UA", {
			day: "numeric",
			month: "long",
			year: "numeric",
		});

	const currentYear = new Date().getFullYear();
	const startYear = 2016;
	const yearOptions = [];

	for (let y = currentYear; y >= startYear; y--) {
		yearOptions.push(y);
	}

	const formatAmountUAH = (amount) => {
		return `₴${new Intl.NumberFormat("uk-UA").format(Math.floor(amount))}`;
	};

	const getColorByMarketShare = (percentage) => {
		if (percentage >= 8) return "#1E5932";
		if (percentage >= 6) return "#388e3c";
		if (percentage >= 4) return "#73AF85";
		if (percentage >= 2) return "#a5d6a7";
		return "#D4E9D7";
	};

	const handleMouseMove = (e) => {
		setMousePos({
			x: e.clientX + window.scrollX,
			y: e.clientY + window.scrollY,
		});
	};
	const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

	if (!isClient) return null;

	if (loading) {
		return (
			<div className="spinner-wrapper">
				<div className="spinner"></div>
			</div>
		);
	}

	if (isMobile) {
		return (
			<div className="mapBigBlock">
				<div className="page">
					<h1>{t("statisticsByRegion")}</h1>
					<div className="info-time-block">
						<div className="info-time">
							{selectedYear === "all" ? (
								error ? (
									<h5>{t("localDataDate")}</h5>
								) : (
									<h5>{t("asOf")} {formatUADate(lastUpdated)}</h5>
								)
							) : (
								<h5>{t("forYear", { year: selectedYear })}</h5>
							)}
						</div>
						<div>
							<select
								className="select-year-map"
								value={selectedYear}
								onChange={(e) => setSelectedYear(e.target.value)}
							>
								<option value="all">{t("allYears")}</option>
								{yearOptions.map((year) => (
									<option key={year} value={year}>{year}</option>
								))}
							</select>
						</div>
					</div>
					{error && <p style={{ color: "red" }}>⚠️ {t("localDataWarning")}</p>}
					<RegionList regions={statistics} t={t} formatAmountUAH={formatAmountUAH} getColorByMarketShare={getColorByMarketShare} />
				</div>
			</div>
		);
	}

	return (
		<div className="mapBigBlock">
			<div className="page">
			<div className="mapLittleBlock">
				<h1>{t("statisticsByRegion")}</h1>

				<div className="info-time-block">
					<div className="info-time">
						{selectedYear === "all" ? (
							error ? (
								<h5>{t("localDataDate")}</h5>
							) : (
								<h5>
									{t("asOf")} {formatUADate(lastUpdated)}
								</h5>
							)
						) : (
							<h5>
								{t("forYear", { year: selectedYear })}
							</h5>
						)}
					</div>

					<div>
						<select
							className="select-year-map"
							value={selectedYear}
							onChange={(e) => setSelectedYear(e.target.value)}
						>
							<option value="all">{t("allYears")}</option>
							{yearOptions.map((year) => (
								<option key={year} value={year}>
									{year}
								</option>
							))}
						</select>
					</div>
				</div>



				<div className="state" onMouseMove={handleMouseMove}>
					{error && <p style={{ color: "red" }}>⚠️ {t("localDataWarning")}</p>}

					<svg width="100%" height="100%" viewBox="0 0 300 300">
						{paths.map(({ id, d }) => {
							const region = statistics[id];
							const isHovered = hoveredRegion && hoveredRegion.id === id;
							const isOther = hoveredRegion && hoveredRegion.id !== id;

							const color = region
								? isOther
									? "#F2F1EE"
									: getColorByMarketShare(region.marketshare)
								: "#F2F1EE";

							return (
								<path
									key={id}
									d={d}
									fill={color}
									stroke="#FFFFFF"
									strokeWidth="0.5"
									onMouseEnter={() => setHoveredRegion(region)}
									onMouseLeave={() => setHoveredRegion(null)}
								/>
							);
						})}
					</svg>
					<div className="color-legend">
						<p><strong>{t("shareOfRegion")}</strong></p>
						<div className="legend-item">
							<div className="color-box" style={{ backgroundColor: "#1E5932" }}></div>
							<span>{t("moreThan8")}</span>
						</div>
						<div className="legend-item">
							<div className="color-box" style={{ backgroundColor: "#388e3c" }}></div>
							<span>{t("from6To8")}</span>
						</div>
						<div className="legend-item">
							<div className="color-box" style={{ backgroundColor: "#73AF85" }}></div>
							<span>{t("from4To6")}</span>
						</div>
						<div className="legend-item">
							<div className="color-box" style={{ backgroundColor: "#a5d6a7" }}></div>
							<span>{t("from2To4")}</span>
						</div>
						<div className="legend-item">
							<div className="color-box" style={{ backgroundColor: "#D4E9D7" }}></div>
							<span>{t("lessThan2")}</span>
						</div>
					</div>

					{hoveredRegion && (
						<div
							className="map-tooltip"
							style={{
								position: "absolute",
								top: mousePos.y - 20,
								left: mousePos.x - 20,
								pointerEvents: "none",
								zIndex: 10,
							}}
						>
							<header className="map-tooltip-header">
								<strong>{hoveredRegion.name}</strong>
								<div
									className="market-share-number"
									style={{
										backgroundColor: getColorByMarketShare(hoveredRegion.marketshare),
										color: hoveredRegion.marketshare < 4 ? "#22252E" : "#ffffff",
									}}
								>
									{hoveredRegion.marketshare?.toFixed(2)}%
								</div>
							</header>
							<div>
								<div className="mini-data">
									<p>{t("receiptsCount")}:</p>
									{hoveredRegion.totalreceipts}
								</div>
								<div className="mini-data">
									<p>{t("amount")}:</p>
									{formatAmountUAH(hoveredRegion.totalamountreceipts)}
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
			</div>
		</div>
	);
};

export default UkraineMap;
