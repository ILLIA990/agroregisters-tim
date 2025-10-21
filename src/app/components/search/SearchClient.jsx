'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import '@/app/styles/search.css';

export default function SearchPage() {
    const t = useTranslations('SearchPage');
    const searchParams = useSearchParams();
    const router = useRouter();

    const queryFromURL = searchParams.get('q') || '';

    const [input, setInput] = useState(queryFromURL);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const q = searchParams.get('q') || '';
        if (!q.trim()) {
            setResults([]);
            return;
        }

        setLoading(true);

        fetch(
            `https://sitenew.agroregisters.com.ua/wp-json/wp/v2/search?search=${encodeURIComponent(
                q,
            )}&per_page=100`,
        )
            .then((r) => r.json())
            .then(async (items) => {
                const details = await Promise.all(
                    items.map(async (item) => {
                        const map = { post: 'posts', page: 'pages', attachment: 'media' };
                        const endpoint = map[item.subtype] || `${item.subtype}s`;
                        try {
                            const r = await fetch(
                                `https://sitenew.agroregisters.com.ua/wp-json/wp/v2/${endpoint}/${item.id}`,
                            );
                            if (!r.ok) return item;
                            const full = await r.json();
                            return { ...item, date: full.date };
                        } catch {
                            return item;
                        }
                    }),
                );
                setResults(details);
                setLoading(false);
            });
    }, [searchParams]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            router.push(`/search?q=${encodeURIComponent(input.trim())}`);
        }
    };

    const pluralize = (n) => {
        if (n % 10 === 1 && n % 100 !== 11) return t('matches.one');
        if ([2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100)) return t('matches.few');
        return t('matches.many');
    };

    return (
        <div className="white-page">
            <div className="page">
                <div className="search-results-page">
                    <h1 className="page-title">{t('title')}</h1>

                    <form onSubmit={handleSubmit} className="search-bar">
                        <input
                            type="text"
                            className="search-input"
                            placeholder={t('placeholder')}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button type="submit" className="search-button" aria-label={t('search')}>
                            🔍
                        </button>
                    </form>

                    {loading && (
                        <div className="loader" role="status" aria-label={t('loading')} />
                    )}

                    {/* {!loading && input.trim() && (
                        <p className="results-count">
                            {t('found')} {results.length} {pluralize(results.length)}
                        </p>
                    )} */}

                    <div className="results-list">
                        {results.map((item) => (
                            <a
                                key={item.id}
                                href={
                                    item.subtype === 'knowledge'
                                        ? `/search/result/knowledge/${item.id}?q=${encodeURIComponent(input.trim())}`
                                        : `/search/result/${item.subtype}/${item.id}?q=${encodeURIComponent(input.trim())}`
                                }
                                className="search-card"
                            >
                                <span
                                    className="card-title"
                                    dangerouslySetInnerHTML={{ __html: item.title }}
                                />
                                {item.date && (
                                    <span className="card-date">
                                        {new Date(item.date).toLocaleDateString('uk-UA')}
                                    </span>
                                )}
                            </a>
                        ))}
                    </div>

                    {!loading && input.trim() && results.length === 0 && (
                        <p className="no-results">{t('noResults')}</p>
                    )}
                </div>
            </div>
        </div>
    );
}
