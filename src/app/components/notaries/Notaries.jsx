'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import NotaryTable from '@/app/components/notaries/NotaryTable';
import TopNotariesTable from '@/app/components/notaries/TopNotariesTable';
import '@/app/styles/style.css';

export default function NotariesPageComponent() {
    const t = useTranslations('NotariesPage');
    const router = useRouter();
    const searchParams = useSearchParams();

    const initialView = searchParams.get('view') === 'top' ? 'top' : 'all';
    const [view, setView] = useState(initialView);

    useEffect(() => {
        const current = searchParams.get('view');
        if (current !== view) {
            router.replace(`/notaries?view=${view}`);
        }
    }, [view]);

    return (
        <main className="page">
            <div className="notariesh1-page"><h1>{t('Title')}</h1></div>
            <div className="toggle-buttons">
                <button
                    className={view === 'top' ? 'active-button' : ''}
                    onClick={() => setView('top')}
                >
                    {t('TopButton')}
                </button>
                <button
                    className={view === 'all' ? 'active-button' : ''}
                    onClick={() => setView('all')}
                >
                    {t('AllButton')}
                </button>
            </div>
            {view === 'top' ? <TopNotariesTable /> : <NotaryTable />}
            <h6 style={{ marginTop: '60px', textAlign: 'center', marginBottom: '100PX' }}>
                {t('Note1')}{' '}
                <a style={{ color: '#2B7441' }} href="mailto:admindp@agroregisters.com.ua">
                    admindp@agroregisters.com.ua
                </a>
            </h6>
        </main>
    );
}
