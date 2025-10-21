'use client';

import { useState, useEffect } from 'react';
import Pagination from '../generall/Pagination';
import { newsImages } from '@/app/data/newsImg';
import '@/app/styles/style.css';
import { useTranslations } from 'next-intl';

const colors = {
    orange: '#DFA247',
    green: '#1E5932',
    olive: '#8BA347',
};

function getSiteLogo(url) {
    try {
        const { hostname } = new URL(url);
        const domain = hostname.replace(/^www\./, '');
        return `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;
    } catch {
        return '';
    }
}

function truncateTitle(title, maxWords = 10) {
    const words = title.split(/\s+/);
    if (words.length > maxWords) {
        return words.slice(0, maxWords).join(' ') + '...';
    }
    return title;
}

export default function NewsList({ apiEndpoint, perPage = 6 }) {
    const t = useTranslations('NewsList');
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(news.length / perPage);
    const start = (currentPage - 1) * perPage;
    const paginatedNews = news.slice(start, start + perPage);

    useEffect(() => {
        async function fetchNews() {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(apiEndpoint);
                if (!res.ok) throw new Error(t('fetchError'));
                const data = await res.json();
                setNews(data.news || []);
                setCurrentPage(1);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        }

        fetchNews();
    }, [apiEndpoint, t]);

    if (loading) {
        return (
            <div id="news-loader" style={{ textAlign: 'center' }}>
                <div className="spinner"></div>
            </div>
        );
    }

    if (error) {
        return <p className="news-parser-no-news">{error}</p>;
    }

    if (!Array.isArray(news) || news.length === 0) {
        return (
            <p className="news-parser-no-news">
                {t('noNews')}
            </p>
        );
    }

    return (
        <div className="news-container">
            {paginatedNews.map((article, idx) => {
                const colorKeys = Object.keys(colors);
                const color = colors[colorKeys[Math.floor(Math.random() * colorKeys.length)]];
                const logo = getSiteLogo(article.link);

                return (
                    <div className="news-block" key={idx}>
                        <div className="news-content">
                            <div className="news-meta">
                                {logo && (
                                    <img
                                        src={logo}
                                        alt="Logo"
                                        className="news-favicon"
                                        width={24}
                                        height={24}
                                    />
                                )}
                                <span className="news-meta-text">
                                    {article.source}
                                </span>
                            </div>
                            <div className="news-title">{truncateTitle(article.title)}</div>
                            <a
                                href={article.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="news-button"
                            >
                                {t('read')}
                            </a>
                        </div>
                        <img
                            src={newsImages[Math.floor(Math.random() * newsImages.length)]}
                            alt={t('newsImageAlt')}
                            className="news-side"
                            loading="lazy"
                        />
                    </div>
                );
            })}

            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            )}
        </div>
    );
}
