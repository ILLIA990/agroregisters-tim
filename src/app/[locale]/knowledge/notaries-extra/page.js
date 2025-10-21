/* eslint-disable @next/next/no-img-element */
'use client';
import { useState } from 'react';
import FAQ from "@/app/components/faq/FAQ";
import '@/app/styles/style.css'
import '@/app/styles/videoInstructions.css';
import { useTranslations, useMessages } from 'next-intl'

function Component1() {
	const t = useTranslations('Component1')
	const messages = useMessages()
	const steps = messages.Notaries_Extra.Component1.steps

	return (
		<div className='alghoritms-component1'>
			<h3>{t('title')}</h3>

			{steps.map((step, i) => (
				<div key={i} className='notaries-algorithm-block'>
					<div className='notaries-algorithm-numbers'>{step.number}</div>
					<div className='notaries-algorithm-text'>
						{step.content.map((block, j) => {
							if (block.type === 'paragraph') {
								return (
									<div key={j}>
										<h2>
											{block.bold ? <b>{block.text}</b> : block.text}{' '}
											{block.link && (
												<a href={block.link.href}>{block.link.text}</a>
											)}
										</h2>
										<br />
									</div>
								)
							}

							if (block.type === 'list') {
								return (
									<ul key={j}>
										{block.items.map((item, k) => (
											<li key={k} style={{ display: 'flex' }}>
												<img src='/check.svg' alt='check' />
												<h2>{item}</h2>
											</li>
										))}
									</ul>
								)
							}
							return null
						})}
					</div>
				</div>
			))}
		</div>
	)
}
function Component2() {
    const t = useTranslations('Component2');

    return (
        <div>
            <h3 style={{ marginBottom: '20px' }}>{t('title')}</h3>
            <ol type="1">
                {[...Array(16)].map((_, i) => (
                    <li key={i} className="notaries-algorithm-text" style={{ display: 'flex' }}>
                        {i + 1}.
                        <a
                            href={`/notaries-users-manual-docs/${i + 1}.pdf`}
                            style={{ marginLeft: '5px' }}
                            target="_blank"
                        >
                            {t(`item${i + 1}`)}
                        </a>
                    </li>
                ))}

                <li className="notaries-algorithm-text">
                    17.
                    <a href="/notaries-users-manual-docs/17.pdf" target="_blank" style={{ marginLeft: '5px' }}>
                        {t('item17.title')}
                    </a>
                    <ol type="a">
                        {[...Array(8)].map((_, j) => (
                            <li key={j}>
                                <a
                                    href={`/notaries-users-manual-docs/17-${String.fromCharCode(97 + j)}.pdf`}
                                    target="_blank"
                                >
                                    {t(`item17.subitem${j + 1}`)}
                                </a>
                            </li>
                        ))}
                    </ol>
                </li>

                <li className="notaries-algorithm-text">
                    18.
                    <a href="/notaries-users-manual-docs/18.pdf" target="_blank" style={{ marginLeft: '5px' }}>
                        {t('item18.title')}
                    </a>
                    <ol type="a">
                        {[...Array(8)].map((_, j) => (
                            <li key={j}>
                                <a
                                    href={`/notaries-users-manual-docs/18-${String.fromCharCode(97 + j)}.pdf`}
                                    target="_blank"
                                >
                                    {t(`item18.subitem${j + 1}`)}
                                </a>
                            </li>
                        ))}
                    </ol>
                </li>

                <li className="notaries-algorithm-text">
                    19.
                    <a href="/notaries-users-manual-docs/19.pdf" style={{ marginLeft: '5px' }}>
                        {t('item19')}
                    </a>
                </li>

                <li className="notaries-algorithm-text">
                    20.
                    <a href="/notaries-users-manual-docs/20.pdf" target="_blank" style={{ marginLeft: '5px' }}>
                        {t('item20')}
                    </a>
                </li>

                <li className="notaries-algorithm-text">
                    21.
                    <a href="/notaries-users-manual-docs/21.pdf" target="_blank" style={{ marginLeft: '5px' }}>
                        {t('item21.title')}
                    </a>
                    <ol type="a">
                        {[...Array(7)].map((_, j) => (
                            <li key={j}>
                                <a
                                    href={`/notaries-users-manual-docs/21-${String.fromCharCode(97 + j)}.pdf`}
                                    target="_blank"
                                >
                                    {t(`item21.subitem${j + 1}`)}
                                </a>
                            </li>
                        ))}
                    </ol>
                </li>

                {[...Array(9)].map((_, i) => (
                    <li
                        key={i}
                        className="notaries-algorithm-text"
                        style={{ display: 'flex' }}
                    >
                        {22 + i}.
                        <a
                            href={`/notaries-users-manual-docs/${22 + i}.pdf`}
                            style={{ marginLeft: '5px' }}
                            target="_blank"
                        >
                            {t(`item${22 + i}`)}
                        </a>
                    </li>
                ))}
            </ol>

            <a
                className="btn-download"
                href="/Full_user_guide_31-7-2025.pdf"
                target="_blank"
                rel="noopener noreferrer"
            >
                {t('downloadAll')}
            </a>
        </div>
    );
}

function Component3() {
    const t = useTranslations('VideoInstructions');

    const videoData = [
        { title: t('video1'), url: 'https://www.youtube.com/watch?v=ou-R5Pdlv2Q' },
        { title: t('video2'), url: 'https://www.youtube.com/watch?v=tJQtpLSZP68' },
        { title: t('video3'), url: 'https://www.youtube.com/watch?v=751vlDSBdOs' },
        { title: t('video4'), url: 'https://www.youtube.com/watch?v=U8wEpSqXgB4' },
        { title: t('video5'), url: 'https://www.youtube.com/watch?v=ek82mORoICA' },
        { title: t('video6'), url: 'https://www.youtube.com/watch?v=B2fe5zCvPWI' },
        { title: t('video7'), url: 'https://www.youtube.com/watch?v=PApJc5vTJJA' },
        { title: t('video8'), url: 'https://www.youtube.com/watch?v=mSJvv-53M1w' },
    ];

    return (
        <div className="video-instructions">
            <h1 className="video-instructions-title">{t('title')}</h1>
            <div className="video-grid">
                {videoData.map((video, index) => (
                    <div className="video-item" key={index}>
                        <h3 className="video-title">{video.title}</h3>
                        <a
                            className="video-preview"
                            href={video.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div className="play-icon">&#9658;</div>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Extra() {
    const [activeTab, setActiveTab] = useState(1);
    const t = useTranslations('Extra');

    return (
        <div className="white-page">
            <div className="page">
                <h1>{t('title')}</h1>
                <div className="button-container-instructions">
                    <div className="button-container-little">
                        <button
                            className={`switch-buttons ${activeTab === 1 ? 'active' : ''}`}
                            onClick={() => setActiveTab(1)}
                        >
                            {t('tab1')}
                        </button>
                        <button
                            className={`switch-buttons ${activeTab === 2 ? 'active' : ''}`}
                            onClick={() => setActiveTab(2)}
                        >
                            {t('tab2')}
                        </button>
                        <button
                            className={`switch-buttons ${activeTab === 3 ? 'active' : ''}`}
                            onClick={() => setActiveTab(3)}
                        >
                            {t('tab3')}
                        </button>
                        <button
                            className={`switch-buttons ${activeTab === 4 ? 'active' : ''}`}
                            onClick={() => setActiveTab(4)}
                        >
                            {t('tab4')}
                        </button>
                    </div>
                    <div>
                        <a
                            href="https://new.agroregisters.com.ua/account/login"
                            className="switch-button-2"
                        >
                            {t('access')}
                        </a>
                    </div>
                </div>

                <div>
                    {activeTab === 1 && <Component1 />}
                    {activeTab === 2 && <Component2 />}
                    {activeTab === 3 && <Component3 />}
                    {activeTab === 4 && <FAQ />}
                </div>
            </div>
        </div>
    );
}