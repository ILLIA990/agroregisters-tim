'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import '@/app/styles/style.css';

export default function MaterialDetail() {
    const { id } = useParams();
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        fetch(`https://sitenew.agroregisters.com.ua/wp-json/wp/v2/knowledge/${id}?_embed`)
            .then((res) => res.json())
            .then((data) => {
                setPost(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    if (loading) return <div style={{ padding: '20px' }}>Завантаження...</div>;
    if (!post) return <div style={{ padding: '20px' }}>Матеріал не знайдено.</div>;

    const acf = post.acf || {};
    const title = post.title?.rendered || '';
    const date = new Date(post.date).toLocaleDateString('uk-UA');
    const imageUrl = post?._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
    const type = acf.type || '';
    const text = acf.text || '';
    const fileUrl = acf.file || '';
    const link = acf.link || '';

    const backUrl = query ? `/search?q=${encodeURIComponent(query)}` : '/search';

    function isYouTubeLink(url) {
        return /youtube\.com|youtu\.be/.test(url);
    }

    function getYouTubeEmbedHTML(url) {
        try {
            const videoId = extractYouTubeId(url);
            if (!videoId) return '';

            return `
      <iframe
        width="100%"
        height="400"
        src="https://www.youtube.com/embed/${videoId}"
        frameborder="0"
        allowfullscreen
      ></iframe>
    `;
        } catch {
            return '';
        }
    }

    function extractYouTubeId(url) {
        const ytRegex =
            /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;
        const match = url.match(ytRegex);
        return match ? match[1] : null;
    }

    return (
        <main className="page">
            <div className="news-container-dp">
                <div className="news-area-dp">
                    <div className="news-card-header-dp">
                        <span className="news-card-date-dp">{date}</span>
                        <div className="news-card-icon-dp">
                            <Image
                                src="/leaf.svg"
                                alt="icon"
                                width={25}
                                height={25}
                            />
                        </div>
                    </div>

                    <h2 className="news-title-main-dp" dangerouslySetInnerHTML={{ __html: title }} />

                    {imageUrl && (
                        <div style={{ marginBottom: '20px' }}>
                            <Image
                                src={imageUrl}
                                alt="Зображення"
                                width={800}
                                height={450}
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </div>
                    )}
                    {type === 'video' && text && (
                        <div className="video-block" style={{ marginBottom: '20px' }}>
                            {isYouTubeLink(text) ? (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: getYouTubeEmbedHTML(text),
                                    }}
                                />
                            ) : (
                                <div dangerouslySetInnerHTML={{ __html: text }} />
                            )}
                        </div>
                    )}

                    {type === 'file' && fileUrl && (
                        <a
                            href={fileUrl}
                            className="news-card-button-back"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ display: 'inline-block', marginBottom: '20px' }}
                        >
                            Завантажити файл
                        </a>
                    )}

                    {type === 'text' && text && (
                        <div dangerouslySetInnerHTML={{ __html: text }} style={{ marginBottom: '20px' }} />
                    )}

                    {['presentation', 'instruction', 'document', 'law', 'nbu', 'usefullinks'].includes(type) && text && link && (
                        <div className="material-link-block" style={{ marginBottom: '20px' }}>
                            <div dangerouslySetInnerHTML={{ __html: text }} />
                            <a href={ link }>Читати більше</a>
                        </div>
                    )}

                    <a className="news-card-button-back" href={backUrl}>
                        ← Повернутись до пошуку
                    </a>
                </div>
            </div>
        </main>
    );
}
