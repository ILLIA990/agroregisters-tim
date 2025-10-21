'use client';
import React, { Suspense } from 'react';
import NotariesPageComponent from "@/app/components/notaries/Notaries";

export default function NotariesPage() {

    return (
        <Suspense fallback={<div>Завантаження...</div>}>
            <NotariesPageComponent/>
        </Suspense>
    );
}

