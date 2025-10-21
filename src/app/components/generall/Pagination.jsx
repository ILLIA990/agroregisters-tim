'use client';
import '@/app/styles/style.css';
import React from 'react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    const getPaginationPages = (current, total) => {
        const pages = [];

        if (total <= 9) {
            for (let i = 1; i <= total; i++) pages.push(i);
        } else {
            pages.push(1);
            if (current > 4) pages.push('...');

            const start = Math.max(2, current - 2);
            const end = Math.min(total - 1, current + 2);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (current < total - 3) pages.push('...');
            pages.push(total);
        }

        return pages;
    };

    const pagesToShow = getPaginationPages(currentPage, totalPages);

    return (
        <div className="news-pagination">
            <button
                className="news-page-link"
                disabled={currentPage === 1}
                onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            >
                «
            </button>

            {pagesToShow.map((page, index) =>
                page === '...' ? (
                    <span key={`dots-${index}`} className="news-page-link dots">...</span>
                ) : (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`news-page-link ${page === currentPage ? 'current' : ''}`}
                    >
                        {page}
                    </button>
                )
            )}


            <button
                className="news-page-link"
                disabled={currentPage === totalPages}
                onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
            >
                »
            </button>
        </div>
    );
}
