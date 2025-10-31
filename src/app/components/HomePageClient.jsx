"use client";
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import '@/app/styles/home.css';
// import '@/app/styles/style.css'

export default function AgroReceipts() {
	const t = useTranslations("HomePage");

	return (
		<section className='agro-wrapper'>
			<div className='page'>
				<div className='agro-hero'>
					<div className='agro-hero-text'>

						<h1>
							<span className='highlight'>{t('titleHighlight')}</span> —{' '}
							{t('title')}
						</h1>
						<p className='subtitle'>{t('subtitle')}</p>
						<p className='description'>{t('description')}</p>
						<a
							className='btn-primary'
							href='https://sitenew.agroregisters.com.ua/wp-content/uploads/2019/09/CR-basics.pdf'
						>
							{t('detailsButton')}
						</a>
					</div>
					<div className='agro-hero-img'>
						<Image
							src='/pic-main-page.png'
							alt='Wheat field'
							width={400}
							height={280}
						/>
					</div>
				</div>
			</div>

			<div className='agro-farmers'>
				<div className='page-k'>
					<h1>{t('farmersTitle')}</h1>
					<div className='cards'>
						<div className='card-home card-orange'>
							<h3>{t('farmersName1')}</h3>
							<p className='location'>
								{t('farmersLocation1')}
							</p>
							<h2>{t('farmer1Text')}</h2>
						</div>
						<div className='card-home card-green'>
							<h3>{t('farmersName2')}</h3>
							<p className='location'>
								{t('farmersLocation2')}
							</p>
							<h2>{t('farmer2Text')}</h2>
						</div>
						<div className='card-home card-olive'>
							<h3>{t('farmersName3')}</h3>
							<p className='location'>
								{t('farmersLocation3')}
							</p>
							<h2>{t('farmer3Text')}</h2>
						</div>
					</div>
				</div>
			</div>

			<div className='agro-creditor'>
				<div className='page-k'>
					<div className='agro-creditor-1'>
						<div className='creditor-img'>
							<Image
								src='/main-page-second.png'
								alt='Grains in hand'
								width={380}
								height={250}
							/>
						</div>
						<div className='creditor-text'>
							<h1>{t('creditorTitle')}</h1>
							<h2>{t('creditorText')}</h2>
							<a className='btn-secondary' href='/history-of-success'>
								{t('storiesButton')}
							</a>
						</div>
					</div>
					<img
						src="/home/Intersect.svg"
						alt=""
						aria-hidden="true"
						className="creditor-decor"
						/>
				</div>
			</div>
			<div className='page-k'>
				<h1>{t('usefullTitle')}</h1>
				<div className='features-list'>
					<div className='features-section-card'>
						<div className='icons-block'>
							<img src='/home/icon1.svg' />
							<div className='icon-features-section'>
								<img src='/knowledge-icons/check.svg' />
							</div>
						</div>
						<h4>{t('feature_1')}</h4>
					</div>
					<div className='features-section-card'>
						<div className='icons-block'>
							<img src='/home/icon2.svg' />
							<div className='icon-features-section'>
								<img src='/knowledge-icons/check.svg' />
							</div>
						</div>
						<h4>{t('feature_2')}</h4>
					</div>
					<div className='features-section-card'>
						<div className='icons-block'>
							<img src='/home/icon3.svg' />
							<div className='icon-features-section'>
								<img src='/knowledge-icons/check.svg' />
							</div>
						</div>
						<h4>{t('feature_3')}</h4>
					</div>
					<div className='features-section-card'>
						<div className='icons-block'>
							<img src='/home/icon4.svg' />
							<div className='icon-features-section'>
								<img src='/knowledge-icons/check.svg' />
							</div>
						</div>
						<h4>{t('feature_4')}</h4>
					</div>
					<div className='features-section-card'>
						<div className='icons-block'>
							<img src='/home/icon5.svg' />
							<div className='icon-features-section'>
								<img src='/knowledge-icons/check.svg' />
							</div>
						</div>
						<h4>{t('feature_5')}</h4>
					</div>
					<div className='features-section-card'>
						<div className='icons-block'>
							<img src='/home/icon6.svg' />
							<div className='icon-features-section'>
								<img src='/knowledge-icons/check.svg' />
							</div>
						</div>
						<h4>{t('feature_6')}</h4>
					</div>
				</div>
			</div>
		</section>
	)
}
