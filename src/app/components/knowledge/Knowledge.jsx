'use client';
import Pagination from '@/app/components/generall/Pagination';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import '@/app/styles/style.css';
import '@/app/styles/knowledge.css';
import { useTranslations } from 'next-intl';

export default function KnowledgeComponent() {
    const { id } = useParams();
    const categoryId = parseInt(id);
    const [categories, setCategories] = useState([]);
    const [currentCat, setCurrentCat] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loadingPosts, setLoadingPosts] = useState(false);
    const [loadingCats, setLoadingCats] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;
    const t = useTranslations('Knowledgecat');

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(posts.length / postsPerPage);

    const tType = useTranslations('MaterialTypes');


    useEffect(() => {
        fetch(t('api_cat'))
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data.categories)) {
                    setCategories(data.categories);
                    const found = data.categories.find(c => c.id === categoryId);
                    if (found) setCurrentCat(found);
                }
                setLoadingCats(false);
            })
            .catch(() => {
                setCategories([]);
                setLoadingCats(false);
            });
    }, [categoryId]);

    useEffect(() => {
        if (!currentCat) return;

        setLoadingPosts(true);
        fetch('/api/knowledge')
            .then(res => res.json())
            .then(data => {
                if (!Array.isArray(data)) {
                    setPosts([]);
                    setLoadingPosts(false);
                    return;
                }

                const filtered = data.filter(post => post.category.includes(currentCat.id));
                setPosts(filtered);
                setLoadingPosts(false);
            })
            .catch(() => {
                setPosts([]);
                setLoadingPosts(false);
            });
    }, [currentCat]);

    const getChildren = (parentId) => categories.filter(cat => cat.parent === parentId);
    const getParent = (cat) => categories.find(c => c.id === cat.parent);

    const renderCategoryMenu = (cats, parentId = 0) => {
			return cats
				.filter(cat => cat.parent === parentId)
				.map(cat => {
					const children = getChildren(cat.id)
					const isActiveParent =
						currentCat && getParent(currentCat)?.id === cat.id
					const isActive =
						currentCat && (currentCat.id === cat.id || isActiveParent)

					return (
						<div
							key={cat.id}
							className={`lib-item item-${cat.id} ${
								children.length ? 'dropdown' : ''
							} ${isActive ? 'active' : ''}`}
						>
							<a
								href={`/knowledge/category/${cat.id}`}
								className={children.length ? 'dropdown-trigger' : ''}
							>
								{cat.name}
								{isActiveParent && currentCat?.id !== cat.id && (
									<>
										:&nbsp;<span className='sub-active'>{currentCat.name}</span>
									</>
								)}
								{children.length > 0 && (
									<svg viewBox='0 0 306 188.7' width='10' height='10'>
										<polygon points='35.7 0 153 117.3 270.3 0 306 35.7 153 188.7 0 35.7 35.7 0' />
									</svg>
								)}
							</a>

							{children.length > 0 && (
								<div className='dropdown-list'>
									{children.map(child => {
										const isChildActive = currentCat?.id === child.id
										return (
											<a
												key={child.id}
												href={`/knowledge/category/${child.id}`}
												className={`item-${child.id} ${
													isChildActive ? 'active-sub' : ''
												}`}
											>
												{child.name}
											</a>
										)
									})}
								</div>
							)}
						</div>
					)
				})
		}


    const parentCat = currentCat ? getParent(currentCat) : null;

    if (loadingCats || loadingPosts) {
        return (
            <div className="notaries-loading">
                <div className="loader"></div>
            </div>
        );
    }

    return (
        <main className="page">
            <div className="container wide">
                <h1>{currentCat?.name}</h1>

                <div className="lib-wrap">
                    {renderCategoryMenu(categories)}
                </div>

                {currentCat?.description && (
                    <p
                        className="description"
                        dangerouslySetInnerHTML={{
                            __html: currentCat.description.replace(/\n/g, "<br />"),
                        }}
                    />
                )}

                {currentCat?.id === 13 && (
                    <a href="/knowledge/notaries-extra" className="cat13-button">
                        Як стати Реєстратором?
                    </a>
                )}

                {currentPosts.length > 0 && (
                    <div className="post-wrap" style={{ marginTop: '40px' }}>
                        {currentPosts.map(post => (
                            <div key={post.id} className="post-item">
                                <a href={`/knowledge/material/${post.id}`} className={`post type-${post.type}`}>
                                    <h2 dangerouslySetInnerHTML={{ __html: post.title }} />
                                    {post.type && (
                                        <span className={`post-type type-${post.type}`}>
                                            {tType(post.type) || post.type}
                                        </span>
                                    )}
                                    <div className="post-icon" />
                                </a>
                            </div>
                        ))}
                    </div>
                )}

                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                )}
            </div>
        </main>
    );
}
