import { NextResponse } from 'next/server';
import { getCache, setCache, getCacheTimestamp } from '@/app/lib/cache';
import { parseAllNews } from '@/app/lib/parser';

const UPDATE_HOUR = 3;

function isCacheExpired() {
    const cacheTimestamp = getCacheTimestamp();
    if (!cacheTimestamp) return true;

    const now = new Date();
    const lastUpdate = new Date(cacheTimestamp);

    if (now.getDate() !== lastUpdate.getDate()) {
        const updateTimeToday = new Date(now);
        updateTimeToday.setHours(UPDATE_HOUR, 0, 0, 0);

        if (now >= updateTimeToday) {
            return true;
        } else {
            return false;
        }
    }
    return false;
}

export async function GET() {
    let news = getCache();
    if (!news || news.length === 0 || isCacheExpired()) {
        news = await parseAllNews();
        setCache(news);
    }
    return NextResponse.json({ news });
}


