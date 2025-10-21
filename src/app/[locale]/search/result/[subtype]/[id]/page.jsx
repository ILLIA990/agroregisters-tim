'use client';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import '@/app/styles/style.css';

export default function SearchDynamicDetail() {
    const { subtype, id } = useParams();
    const searchParams = useSearchParams();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const endpointMap = {
        post: 'posts',
        page: 'pages',
        faq: 'faq',
        notaries: 'notaries',
        knowledge: 'knowledge',
    };

    const query = searchParams.get('q') || '';

    useEffect(() => {
        const fetchData = async () => {
            const endpoint = endpointMap[subtype];
            if (!endpoint) {
                setError('Невідомий тип контенту');
                return;
            }

            try {
                const res = await fetch(`https://sitenew.agroregisters.com.ua/wp-json/wp/v2/${endpoint}/${id}?_embed`);
                if (!res.ok) throw new Error('Помилка завантаження');
                const item = await res.json();
                setData(item);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, [subtype, id]);

    if (error) return <div style={{ padding: 20 }}>❌ {error}</div>;
    if (!data) return <div style={{ padding: 20 }}>Завантаження...</div>;

    const title = data.title?.rendered || '';
    const content = data.content?.rendered || '';
    const date = data.date ? new Date(data.date).toLocaleDateString('uk-UA') : '';

    const backUrl = query ? `/search?q=${encodeURIComponent(query)}` : '/search';

    return (
        <main className="page">
            <div className="news-container-dp">
                <div className="news-area-dp">
                    <div className="news-card-header-dp">
                        <span className="news-card-date-dp">{date}</span>
                        <div className="news-card-icon-dp">
                            <img src="/leaf.svg" width={25} height={25} alt="icon" />
                        </div>
                    </div>

                    <h2
                        className="news-title-main-dp"
                        dangerouslySetInnerHTML={{ __html: title }}
                    />

                    <div dangerouslySetInnerHTML={{ __html: content }} />

                    <a className="news-card-button-back" href={backUrl}>
                        ← Назад до пошуку
                    </a>
                </div>
            </div>
        </main>
    );
}
