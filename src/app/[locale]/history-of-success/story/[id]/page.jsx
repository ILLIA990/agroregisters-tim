'use client';

import { useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import '@/app/styles/hos.css';

export default function StoryPage({ params }) {
    const t = useTranslations('stories');
    const story = t.raw(params.id);

    if (!story) return notFound();

    return (
        <div className="page">
            <div className="story-container">
                <h1 className="story-title">{story.title}</h1>

                <Image
                    src={story.img}
                    alt={story.title}
                    width={900}
                    height={400}
                    className="story-image"
                />

                <div className="story-meta">
                    {story.icon && <img className="author-icon" src={story.icon} alt="author" />}
                    <h3 className="story-author">{story.author}</h3>
                </div>

                <div className="story-content">
                    {story.content?.map((p, idx) => (
                        <p key={idx}>{p}</p>
                    ))}
                </div>

                {story.author_2 && <h3 className="story-author">{story.author_2}</h3>}

                {story.quote && (
                    <div className="quote">
                        <img src="/stories/quote.png" alt="quote icon" />
                        <blockquote className="story-quote">
                            {story.quote.map((p, idx) => (
                                <p className="story-quote" key={idx}>{p}</p>
                            ))}
                        </blockquote>
                    </div>
                )}

                {story.qa && story.qa.length > 0 && (
                    <section className="qa-section" aria-label="Q&A">
                        {story.qa.map((item, idx) => (
                            <div key={idx} className="qa-block">
                                <h4 className="qa-question">{item.question}</h4>

                                {Array.isArray(item.answer)
                                    ? item.answer.map((a, j) => (
                                        <p className="qa-answer" key={j}>{a}</p>
                                    ))
                                    : <p className="qa-answer">{item.answer}</p>}
                            </div>
                        ))}
                    </section>
                )}
            </div>
        </div>
    );
}
