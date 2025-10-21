'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '@/app/styles/search.css';

export default function SearchOverlay({ isOpen, onClose }) {
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim().length > 0) {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="search-overlay">
            <button className="search-close" onClick={onClose}>×</button>
            <div className="search-box">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Пошук по сайту..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        autoFocus
                    />
                    <button type="submit" className="search-submit-btn">
                        <img src="/g1302.svg"/>
                    </button>
                </form>
            </div>
        </div>
    );
}
