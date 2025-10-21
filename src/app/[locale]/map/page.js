'use client'
import '@/app/styles/style.css'
import UkraineMap from "@/app/components/map/MapComponent";
import InfoMap from "@/app/components/map/infoMap";

export default function Map() {
    return (
        <div className="main" style={{ position: "relative" }}>
            <InfoMap/>
            <UkraineMap/>
        </div>
    );
}