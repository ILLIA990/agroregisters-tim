'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import '@/app/styles/knowledgecat.css'
import '@/app/styles/style.css';
import { useTranslations } from 'next-intl';

const KnowledgeCat = () => {
    const [categories, setCategories] = useState([]);
    const [loadingCats, setLoadingCats] = useState(true);
    const t = useTranslations('Knowledgecat');

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await fetch(t('api_cat'));
            const data = await res.json();

            const topLevel = data.categories.filter(cat => cat.parent === 0);
            const withChildren = topLevel.map(parent => ({
                ...parent,
                children: data.categories.filter(child => child.parent === parent.id),
            }));

            setCategories(withChildren);
            setLoadingCats(false);
        };

        fetchCategories();
    }, []);

    if (loadingCats) {
        return (
            <div className="notaries-loading">
                <div className="loader"></div>
            </div>
        );
    }

    return (
        <div className="lib-wrap-one">
            {categories.map(cat => (
                <div key={cat.id} className={`lib-item-one el-${cat.id}`}>
                    <h3>
                        <Link href={`/knowledge/category/${cat.id}`}>{cat.name}</Link>
                    </h3>
                    {cat.children.length > 0 && (
                        <div>
                            {cat.children.map(child => (
                                <Link key={child.id} href={`/knowledge/category/${child.id}`} className={`el-${child.id}`}>
                                    {child.name}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default KnowledgeCat;
