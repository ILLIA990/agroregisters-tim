import {allowedLinks, sources} from "@/app/data/sources";
import {keywords} from "@/app/data/keywords";
import { JSDOM } from 'jsdom';
import fetch from 'node-fetch';

function normalize(text) {
    return text?.replace(/\s+/g, ' ').trim();
}
function isAllowedDomain(url) {
    try {
        const hostname = new URL(url).hostname.replace(/^www\./, '');
        return allowedLinks.includes(hostname);
    } catch {
        return false;
    }
}
function getFavicon(url) {
    try {
        const { hostname } = new URL(url);
        return `https://www.google.com/s2/favicons?sz=64&domain=${hostname}`;
    } catch {
        return null;
    }
}

function toAbsolute(href, baseUrl) {
    try {
        return new URL(href, baseUrl).href;
    } catch {
        return null;
    }
}

export async function parseAllNews() {
    const allNews = [];

    for (const site of sources) {
        try {
            const res = await fetch(site, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (NewsBot)'
                }
            });

            const html = await res.text();
            const dom = new JSDOM(html);
            const anchors = [...dom.window.document.querySelectorAll('a')];

            for (const a of anchors) {
                const title = normalize(a.textContent);
                const href = a.getAttribute('href');
                if (!href || !title || title.length < 10) continue;

                const fullUrl = toAbsolute(href, site);
                if (!fullUrl || !/^https?:\/\//.test(fullUrl)) continue;

                const titleWords = title.toLowerCase().split(/\s+/);
                const matches = keywords.some(keyword => {
                    return titleWords.some(word => word.includes(keyword.toLowerCase()));
                });

                if (!matches) continue;

                if (!isAllowedDomain(fullUrl)) continue;

                if (allNews.some(n => n.link === fullUrl)) continue;

                allNews.push({
                    title,
                    link: fullUrl,
                    favicon: getFavicon(fullUrl),
                    source: new URL(fullUrl).hostname
                });
            }
        } catch (err) {
            console.error(`❌ Ошибка парсинга сайта ${site}: ${err.message}`);
        }
    }

    return allNews;
}
