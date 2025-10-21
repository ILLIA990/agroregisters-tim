'use client';
import React, { useState, useEffect } from 'react';
import '@/app/styles/faq.css';
import '@/app/styles/style.css';

export default function FAQ() {
    const [faqs, setFaqs] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);
    const [loading, setLoading] = useState(true); // <- по умолчанию true

    useEffect(() => {
        fetch(
					'https://sitenew.agroregisters.com.ua/wp-json/wp/v2/faq?per_page=100&order=asc'
				)
					.then(res => res.json())
					.then(data => {
						setFaqs(data)
						setLoading(false)
					})
					.catch(() => {
						setFaqs([])
						setLoading(false)
					})
    }, []);

    const toggle = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    if (loading) {
        return (
            <div className="notaries-loading">
                <div className="loader"></div>
            </div>
        );
    }

    return (
			<div className='faq-container'>
				<h1 className='faq-title'>Поширені запитання</h1>
				{faqs.map((faq, index) => (
					<div
						key={faq.id}
						className={`faq-item ${activeIndex === index ? 'open' : ''}`}
					>
						<button className='faq-question' onClick={() => toggle(index)}>
							<h4>{faq.title.rendered}</h4>
							<span
								className={`faq-toggle ${activeIndex === index ? 'open' : ''}`}
							></span>
						</button>
						{activeIndex === index && (
							<h5
								className='faq-answer'
								dangerouslySetInnerHTML={{ __html: faq.acf.answer }}
							/>
						)}
					</div>
				))}
			</div>
		)
}
