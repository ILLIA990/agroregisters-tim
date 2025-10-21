'use client';
import React from 'react';
import Image from 'next/image';
import '@/app/styles/style.css'
export default async function NewsDetail({ params }) {
    const { id } = params;

    const res = await fetch(`https://sitenew.agroregisters.com.ua/wp-json/wp/v2/posts/${id}`, {
        next: { revalidate: 60 },
    });

    if (!res.ok) {
        return <div style={{ padding: '20px' }}>Помилка завантаження новини.</div>;
    }

    const post = await res.json();
    const date = new Date(post.date).toLocaleDateString('uk-UA');
    const title = post.title?.rendered || '';
    const content = post.content?.rendered || '';
    const imageUrl = post?.yoast_head_json?.og_image?.[0]?.url || null;

    return (
        <main className="page">
            <div className="news-container-dp">
                <div className="news-area-dp">
                    <div className="news-card-header-dp">
                        <span className="news-card-date-dp">{date}</span>
                        <div className="news-card-icon-dp">
                            <Image src="https://sitenew.agroregisters.com.ua/wp-content/uploads/2025/06/Vector.svg" alt="icon" width={25} height={25} />
                        </div>
                    </div>

                    <h2 className="news-title-main-dp" dangerouslySetInnerHTML={{ __html: title }} />

                    {imageUrl && (
                        <div style={{ marginBottom: '20px' }}>
                            <Image src={imageUrl} alt="Зображення" width={800} height={450} style={{ width: '100%', height: 'auto' }} />
                        </div>
                    )}

                    <h3 dangerouslySetInnerHTML={{ __html: content }} />
                    <a className="news-card-button-back" href="/news">Повернутись до статей</a>
                </div>
            </div>
        </main>
    );
}
