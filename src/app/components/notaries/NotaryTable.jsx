'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import '@/app/styles/style.css';
import Pagination from '../generall/Pagination';

export default function NotaryTable() {
    const t = useTranslations('NotaryTable');

    const [notaries, setNotaries] = useState([]);
    const [regionFilter, setRegionFilter] = useState('');
    const [cityFilter, setCityFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const perPage = 20;

    const regions = [
        'Автономна республіка Крим', 'Вінницька', 'Волинська', 'Дніпропетровська', 'Донецька',
        'Житомирська', 'Закарпатська', 'Запорізька', 'Івано-Франківська', 'Київська', 'Кіровоградська',
        'Луганська', 'Львівська', 'Миколаївська', 'Одеська', 'Полтавська', 'Рівненська', 'Сумська',
        'Тернопільська', 'Харківська', 'Херсонська', 'Хмельницька', 'Черкаська', 'Чернівецька', 'Чернігівська'
    ];

    function decodeHtmlEntities(text) {
        const txt = document.createElement('textarea');
        txt.innerHTML = text;
        return txt.value;
    }

    useEffect(() => {
        fetchNotaries();
    }, [regionFilter, cityFilter, currentPage]);

    const fetchNotaries = async () => {
        setLoading(true);
        const query = new URLSearchParams({
            page: currentPage,
            per_page: perPage,
            ...(regionFilter && { region: regionFilter }),
            ...(cityFilter && { city: cityFilter }),
        }).toString();

        try {
            const res = await fetch(`/api/notaries?${query}`);
            const json = await res.json();
            setNotaries(json.notaries);
            setTotalPages(json.totalPages);
        } catch (e) {
            console.error(e);
            setNotaries([]);
        } finally {
            setLoading(false);
        }
    };

    const cities = Array.from(new Set(notaries.map(n => n.city).filter(Boolean))).sort();

    if (loading) {
        return (
            <div className="notaries-loading">
                <div className="loader"></div>
            </div>
        );
    }

    return (
        <div>
            <h2 style={{ marginBottom: '20px' }}>{t('Title')}</h2>
            <div className="notaries-block-table">
                <table className="notaries-table">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>
                            <select value={cityFilter} onChange={e => setCityFilter(e.target.value)}>
                                <option value="">{t('City')}</option>
                                {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </th>
                        <th>
                            <select value={regionFilter} onChange={e => setRegionFilter(e.target.value)}>
                                <option value="">{t('Region')}</option>
                                {regions.map(region => (
                                    <option key={region} value={region}>{region}</option>
                                ))}
                            </select>
                        </th>
                        <th>{t('Name')}</th>
                        <th>{t('Contacts')}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {notaries.map((n, i) => (
                        <tr key={n.id}>
                            <td>{(currentPage - 1) * perPage + i + 1}</td>
                            <td>{n.city || '-'}</td>
                            <td>{n.region || '-'}</td>
                            <td>{decodeHtmlEntities(n.title.rendered)}</td>
                            <td>{n.phone || '-'}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}
