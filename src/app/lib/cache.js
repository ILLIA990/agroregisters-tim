let cachedNews = null;
let cachedAt = null;

export function getCache() {
    return cachedNews;
}

export function setCache(news) {
    cachedNews = news;
    cachedAt = new Date().toISOString();
}

export function getCacheTimestamp() {
    return cachedAt;
}
