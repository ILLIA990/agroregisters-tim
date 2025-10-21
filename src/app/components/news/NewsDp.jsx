'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import '@/app/styles/style.css';
import Pagination from '@/app/components/generall/Pagination';

async function fetchAllNews(perPage = 100) {
    let page = 1;
    let allPosts = [];
    let totalPages = 1;

    try {
        do {
            const res = await fetch(`/api/news-dp?page=${page}&per_page=${perPage}`);
            if (!res.ok) throw new Error(`Error loading page ${page}`);

            const json = await res.json();
            totalPages = json.totalPages || 1;
            allPosts = allPosts.concat(json.posts);

            page++;
        } while (page <= totalPages);

        return allPosts;
    } catch (error) {
        console.error('Error loading news:', error);
        return [];
    }
}

function formatDate(isoDate) {
    const date = new Date(isoDate);
    return date.toLocaleDateString('uk-UA');
}

export default function NewsDp() {
    const t = useTranslations('NewsDP'); // Namespace
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;

    useEffect(() => {
        fetchAllNews().then((data) => {
            setPosts(data);
            setLoading(false);
        });
    }, []);

    const totalPages = Math.ceil(posts.length / postsPerPage);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    if (loading) {
        return (
            <div className="notaries-loading">
                <div className="loader"></div>
            </div>
        );
    }

    return (
        <>
            <div className="row-blog-messonary">
                {currentPosts.map(post => {
                    const isImportant = post.acf?.importance === 'yes';

                    return (
                        <div key={post.id} className="custom-news-card">
                            <div className="news-card-inner">
                                <div className="news-card-header">
                                    <span className="news-card-date">{formatDate(post.date)}</span>
                                    <div
                                        className="news-card-icon"
                                        style={{
                                            backgroundColor: isImportant ? '#DFA247' : '#2B7441',
                                        }}
                                    >
                                        <img
                                            src={isImportant ? '/exclamation.svg' : '/leaf.svg'}
                                            alt="icon"
                                        />
                                    </div>
                                </div>
                                <h3 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                            </div>
                            <a className="news-card-button" href={`/news/${post.id}`}>
                                {t('readMore')}
                            </a>
                        </div>
                    );
                })}
            </div>

            {posts.length > postsPerPage && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}
        </>
    );
}
