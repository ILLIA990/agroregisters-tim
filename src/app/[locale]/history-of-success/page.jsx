'use client';

import '@/app/styles/style.css';
import { useTranslations } from 'next-intl';

const stories = [
    {
        id: 1,
        date: '01.01.2025',
        title: 'Перша «м’ясна» аграрна розписка: крок до розвитку фермерства на Яворівщині',
        img: '/stories/cows.png',
        href: '/history-of-success/story/1'
    },
    {
        id: 2,
        date: '01.01.2025',
        title: 'Аграрна розписка як квиток до міжнародного фінансування для органічного бізнесу',
        img: '/stories/sunflowers.png',
        href: '/history-of-success/story/2'
    },
    {
        id: 3,
        date: '01.01.2025',
        title: 'Від кризи до нових можливостей: історія успіху фермера з Львівщини',
        img: '/stories/field.png',
        href: '/history-of-success/story/3'
    },
    {
        id: 4,
        date: '01.01.2025',
        title: 'Аграрна розписка як старт для ягідного бізнесу у горах Карпат',
        img: '/stories/berries.png',
        href: '/history-of-success/story/4'
    },
    {
        id: 5,
        date: '01.01.2025',
        title: 'Відео: Аграрні розписки стали фінансовою опорою для агробізнесу в прифронтових регіонах',
        img: '/stories/wheat.png',
        href: '/history-of-success/story/video'
    },
];

export default function SuccessStories() {
    const t = useTranslations('stories');

    return (
        <div className="page">
            <div className="news-container">
                <h1>Історії успіху</h1>
                {stories.map((story, idx) => (
                    <div className="news-block" key={idx}>
                        <div className="news-content">
                            <div className="news-title">{story.title}</div>
                            <a
                                href={story.href}
                                className="news-button"
                            >
                                Читати
                            </a>
                        </div>
                        <img
                            src={story.img}
                            alt={story.title}
                            className="news-side"
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
