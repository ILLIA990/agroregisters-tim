'use client';
import React, { useEffect, useState } from "react";
import '@/app/styles/style.css';
import {useTranslations} from "next-intl";

async function fetchAllNotaries(perPage = 100) {
    let page = 1;
    let allNotaries = [];
    let totalPages = 1;

    try {
        do {
            const res = await fetch(`/api/notaries?page=${page}&per_page=${perPage}`);
            if (!res.ok) throw new Error(`Ошибка запроса на странице ${page}`);

            const json = await res.json();
            totalPages = json.totalPages || 1;
            allNotaries = allNotaries.concat(json.notaries);

            page++;
        } while (page <= totalPages);

        return allNotaries;
    } catch (error) {
        console.error("Ошибка при загрузке нотариусов:", error);
        return [];
    }
}

async function fetchFilteredNotaries() {
    const allNotaries = await fetchAllNotaries();

    const filtered = allNotaries
        .filter(n => {
            const rating = Number(n.rating_num);
            return !isNaN(rating) && rating >= 1 && rating <= 20;
        })
        .sort((a, b) => Number(a.rating_num) - Number(b.rating_num));

    return filtered;
}
function decodeHtmlEntities(text) {
    const txt = document.createElement('textarea');
    txt.innerHTML = text;
    return txt.value;
}
export default function NotaryTable() {
    const [notaries, setNotaries] = useState([]);
    const [loading, setLoading] = useState(true);
    const t = useTranslations('NotaryTable');

    useEffect(() => {
        fetchFilteredNotaries().then((data) => {
            setNotaries(data);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className="notaries-loading">
                <div className="loader"></div>
            </div>
        );
    }

    return (
			<div>
				<h2 style={{ marginBottom: '20px' }}>{t('Title2')}</h2>
				<div className='notaries-block-table'>
					<table className='notaries-table'>
						<thead>
							<tr>
								<th>{t('Rating_num')}</th>
								<th>{t('Region')}</th>
								<th>{t('City')}</th>
								<th>{t('Name')}</th>
								<th>{t('Contacts')}</th>
							</tr>
						</thead>
						<tbody>
							{notaries.map(n => (
								<tr key={n.id}>
									<td>{n.rating_num}</td>
									<td>{n.region}</td>
									<td>{n.city}</td>
									<td>{decodeHtmlEntities(n.title.rendered)}</td>
									<td>{n.phone}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		)
}
