import { Suspense } from 'react';
import SearchPage from '@/app/components/search/SearchClient';

export default function SearchPageWrapper() {
    return (
        <Suspense fallback={<div>Завантаження результатів...</div>}>
            <SearchPage />
        </Suspense>
    );
}
