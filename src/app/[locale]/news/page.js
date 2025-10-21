'use client';

import React, { Suspense } from 'react';
import NewsPageComponent from "@/app/components/news/News";

export default function NewsPage() {
    return (
        <Suspense fallback={<div>Завантаження...</div>}>
            <NewsPageComponent/>
        </Suspense>
    );
}
