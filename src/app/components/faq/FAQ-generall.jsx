'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '@/app/styles/faq-g.css';

export default function FAQAccordion() {
    const [categories, setCategories] = useState([]);
    const [questionsByCategory, setQuestionsByCategory] = useState({});
    const [openCategory, setOpenCategory] = useState(null);
    const [openQuestionId, setOpenQuestionId] = useState(null);
    const [activeCategoryIndex, setActiveCategoryIndex] = useState(null);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [loadingQuestions, setLoadingQuestions] = useState(false);

    useEffect(() => {
        axios
            .get('https://sitenew.agroregisters.com.ua/wp-json/wp/v2/faq-generalcat')
            .then((res) => {
                setCategories(res.data);
                setLoadingCategories(false);
            })
            .catch((err) => {
                console.error('Failed to fetch categories', err);
                setLoadingCategories(false);
            });
    }, []);

    const toggleCategory = (categoryId, index) => {
        if (openCategory === categoryId) {
            setOpenCategory(null);
            setOpenQuestionId(null);
            setActiveCategoryIndex(null);
        } else {
            setOpenCategory(categoryId);
            setOpenQuestionId(null);
            setActiveCategoryIndex(index);

            if (!questionsByCategory[categoryId]) {
                setLoadingQuestions(true);
                axios
                    .get(
                        `https://sitenew.agroregisters.com.ua/wp-json/wp/v2/faq-general?faq-generalcat=${categoryId}&per_page=100`
                    )
                    .then((res) => {
                        setQuestionsByCategory((prev) => ({
                            ...prev,
                            [categoryId]: res.data,
                        }));
                        setLoadingQuestions(false);
                    })
                    .catch((err) => {
                        console.error('Failed to fetch questions', err);
                        setLoadingQuestions(false);
                    });
            }
        }
    };

    const toggleQuestion = (questionId) => {
        setOpenQuestionId((prev) => (prev === questionId ? null : questionId));
    };

    if (loadingCategories) {
        return (
            <div className="notaries-loading">
                <div className="loader"></div>
            </div>
        );
    }

    return (
        <div className="page">
            <div className="faq-container">
                <h1 className="faq-title">Поширені запитання</h1>
                {categories.map((category, index) => (
                    <div
                        key={category.id}
                        className={`faq-item2 ${activeCategoryIndex === index ? 'open' : ''}`}
                    >
                        <button
                            onClick={() => toggleCategory(category.id, index)}
                            className="faq-header"
                        >
                            <h4>{category.name}</h4>
                            <span
                                className={`faq-toggle2 ${
                                    activeCategoryIndex === index ? 'open' : ''
                                }`}
                            ></span>
                        </button>

                        {openCategory === category.id && (
                            <div className="faq-questions">
                                {loadingQuestions ? (
                                    <div className="loader"></div>
                                ) : (
                                    questionsByCategory[category.id]?.map((question) => (
                                        <div
                                            key={question.id}
                                            className={`faq-item ${
                                                openQuestionId === question.id ? 'open' : ''
                                            }`}
                                        >
                                            <button
                                                onClick={() => toggleQuestion(question.id)}
                                                className="faq-question"
                                            >
                                                <h4>{question.title.rendered}</h4>
                                                <span
                                                    className={`faq-toggle ${
                                                        openQuestionId === question.id ? 'open' : ''
                                                    }`}
                                                ></span>
                                            </button>
                                            {openQuestionId === question.id && (
                                                <h6
                                                    className="faq-answer"
                                                    dangerouslySetInnerHTML={{
                                                        __html: question.acf.answer,
                                                    }}
                                                />
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>

    );
}
