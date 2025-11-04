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
									<h2 key={j}>
										<span
											dangerouslySetInnerHTML={{
												__html: block.bold
													? `<b>${block.text}</b>`
													: block.text,
											}}
										/>
										{block.link && (
											<>
												{' '}
												<a href={block.link.href}>{block.link.text}</a>
											</>
										)}
									</h2>
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
	const t = useTranslations('Component2')

	const A = ({ href, label }) => (
		<a href={href} target='_blank' rel='noopener noreferrer'>
			{label}
		</a>
	)

	return (
		<div>
			<h3 style={{ marginBottom: 50 }}>{t('title')}</h3>
			<ol type='1'>
				<li className='notaries-algorithm-text'>
					<A href='/notaries-users-manual-docs/1.pdf' label={t('item1')} />
				</li>
				<li className='notaries-algorithm-text'>
					<A href='/notaries-users-manual-docs/2.pdf' label={t('item2')} />
				</li>
				<li className='notaries-algorithm-text'>
					<A href='/notaries-users-manual-docs/3.pdf' label={t('item3')} />
					<ol type='a'>
						<li>
							<A href='/notaries-users-manual-docs/4.pdf' label={t('item4')} />
						</li>
						<li>
							<A href='/notaries-users-manual-docs/5.pdf' label={t('item5')} />
						</li>
					</ol>
				</li>
				<li className='notaries-algorithm-text'>
					<A href='/notaries-users-manual-docs/6.pdf' label={t('item6')} />
					<ol type='a'>
						<li>
							<A href='/notaries-users-manual-docs/7.pdf' label={t('item7')} />
						</li>
						<li>
							<A href='/notaries-users-manual-docs/8.pdf' label={t('item8')} />
						</li>
						<li>
							<A href='/notaries-users-manual-docs/9.pdf' label={t('item9')} />
						</li>
					</ol>
				</li>
				<li className='notaries-algorithm-text'>
					<A href='/notaries-users-manual-docs/10.pdf' label={t('item10')} />
					<ol type='a'>
						<li>
							<A
								href='/notaries-users-manual-docs/11.pdf'
								label={t('item11')}
							/>
						</li>
						<li>
							<A
								href='/notaries-users-manual-docs/12.pdf'
								label={t('item12')}
							/>
						</li>
						<li>
							<A
								href='/notaries-users-manual-docs/13.pdf'
								label={t('item13')}
							/>
						</li>
						<li>
							<A
								href='/notaries-users-manual-docs/14.pdf'
								label={t('item14')}
							/>
						</li>
						<li>
							<A
								href='/notaries-users-manual-docs/15.pdf'
								label={t('item15')}
							/>
						</li>
					</ol>
				</li>
				<li className='notaries-algorithm-text'>
					<A href='/notaries-users-manual-docs/16.pdf' label={t('item16')} />
					<ol type='a'>
						<li>
							<A
								href='/notaries-users-manual-docs/17.pdf'
								label={t('item17.title')}
							/>
							<ol type='i'>
								<li>
									<A
										href='/notaries-users-manual-docs/17-a.pdf'
										label={t('item17.subitem1')}
									/>
								</li>
								<li>
									<A
										href='/notaries-users-manual-docs/17-b.pdf'
										label={t('item17.subitem2')}
									/>
								</li>
								<li>
									<A
										href='/notaries-users-manual-docs/17-c.pdf'
										label={t('item17.subitem3')}
									/>
								</li>
								<li>
									<A
										href='/notaries-users-manual-docs/17-d.pdf'
										label={t('item17.subitem4')}
									/>
								</li>
								<li>
									<A
										href='/notaries-users-manual-docs/17-e.pdf'
										label={t('item17.subitem5')}
									/>
								</li>
								<li>
									<A
										href='/notaries-users-manual-docs/17-f.pdf'
										label={t('item17.subitem6')}
									/>
								</li>
								<li>
									<A
										href='/notaries-users-manual-docs/17-g.pdf'
										label={t('item17.subitem7')}
									/>
								</li>
								<li>
									<A
										href='/notaries-users-manual-docs/17-h.pdf'
										label={t('item17.subitem8')}
									/>
								</li>
							</ol>
						</li>
						<li>
							<A
								href='/notaries-users-manual-docs/18.pdf'
								label={t('item18.title')}
							/>
							<ol type='i'>
								<li>
									<A
										href='/notaries-users-manual-docs/18-a.pdf'
										label={t('item18.subitem1')}
									/>
								</li>
								<li>
									<A
										href='/notaries-users-manual-docs/18-b.pdf'
										label={t('item18.subitem2')}
									/>
								</li>
								<li>
									<A
										href='/notaries-users-manual-docs/18-c.pdf'
										label={t('item18.subitem3')}
									/>
								</li>
								<li>
									<A
										href='/notaries-users-manual-docs/18-d.pdf'
										label={t('item18.subitem4')}
									/>
								</li>
								<li>
									<A
										href='/notaries-users-manual-docs/18-e.pdf'
										label={t('item18.subitem5')}
									/>
								</li>
								<li>
									<A
										href='/notaries-users-manual-docs/18-f.pdf'
										label={t('item18.subitem6')}
									/>
								</li>
								<li>
									<A
										href='/notaries-users-manual-docs/18-g.pdf'
										label={t('item18.subitem7')}
									/>
								</li>
								<li>
									<A
										href='/notaries-users-manual-docs/18-h.pdf'
										label={t('item18.subitem8')}
									/>
								</li>
							</ol>
						</li>
					</ol>
				</li>
				<li className='notaries-algorithm-text'>
					<A href='/notaries-users-manual-docs/19.pdf' label={t('item19')} />
				</li>
				<li className='notaries-algorithm-text'>
					<A href='/notaries-users-manual-docs/20.pdf' label={t('item20')} />
				</li>
				<li className='notaries-algorithm-text'>
					<A
						href='/notaries-users-manual-docs/21.pdf'
						label={t('item21.title')}
					/>
					<ol type='i'>
						<li>
							<A
								href='/notaries-users-manual-docs/21-a.pdf'
								label={t('item21.subitem1')}
							/>
						</li>
						<li>
							<A
								href='/notaries-users-manual-docs/21-b.pdf'
								label={t('item21.subitem2')}
							/>
						</li>
						<li>
							<A
								href='/notaries-users-manual-docs/21-c.pdf'
								label={t('item21.subitem3')}
							/>
						</li>
						<li>
							<A
								href='/notaries-users-manual-docs/21-d.pdf'
								label={t('item21.subitem4')}
							/>
						</li>
						<li>
							<A
								href='/notaries-users-manual-docs/21-e.pdf'
								label={t('item21.subitem5')}
							/>
						</li>
						<li>
							<A
								href='/notaries-users-manual-docs/21-f.pdf'
								label={t('item21.subitem6')}
							/>
						</li>
						<li>
							<A
								href='/notaries-users-manual-docs/21-g.pdf'
								label={t('item21.subitem7')}
							/>
						</li>
					</ol>
				</li>
				<li className='notaries-algorithm-text'>
					<A href='/notaries-users-manual-docs/22.pdf' label={t('item22')} />
				</li>
				<li className='notaries-algorithm-text'>
					<A href='/notaries-users-manual-docs/28.pdf' label={t('item28')} />
					<ol type='a'>
						<li>
							<A
								href='/notaries-users-manual-docs/29.pdf'
								label={t('item29')}
							/>
						</li>
					</ol>
				</li>
				<li className='notaries-algorithm-text'>
					<A href='/notaries-users-manual-docs/30.pdf' label={t('item30')} />
				</li>
			</ol>

			<a
				className='btn-download'
				href='/Full_user_guide_31-7-2025.pdf'
				target='_blank'
				rel='noopener noreferrer'
			>
				{t('downloadAll')}
			</a>
		</div>
	)
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
                <div className='page-notaries'><h1>{t('title')}</h1></div>
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