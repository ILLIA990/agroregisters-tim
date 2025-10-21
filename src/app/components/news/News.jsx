'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import NewsList from '@/app/components/news/NewsList';
import NewsDp from '@/app/components/news/NewsDp';
import '@/app/styles/style.css';

export default function NewsPageComponent() {
    const t = useTranslations('News'); // Namespace
    const router = useRouter();
    const searchParams = useSearchParams();

    const initialTab = searchParams.get('tab') === 'dp' ? 'dp' : 'agrosphere';
    const [activeTab, setActiveTab] = useState(initialTab);

    useEffect(() => {
        const current = searchParams.get('tab');
        if (current !== activeTab) {
            router.replace(`/news?tab=${activeTab}`);
        }
    }, [activeTab]);

    return (
        <main className="page">
            <h2 className="news-title-main">{t('title')}</h2>
            <div className="toggle-buttons">
                <button
                    className={activeTab === 'agrosphere' ? 'active-button' : ''}
                    onClick={() => setActiveTab('agrosphere')}
                >
                    {t('tabAgrosphere')}
                </button>
                <button
                    className={activeTab === 'dp' ? 'active-button' : ''}
                    onClick={() => setActiveTab('dp')}
                >
                    {t('tabDp')}
                </button>
            </div>

            {activeTab === 'agrosphere' ? (
                <NewsList apiEndpoint="/api/news" perPage={5} />
            ) : (
                <NewsDp />
            )}
        </main>
    );
}
