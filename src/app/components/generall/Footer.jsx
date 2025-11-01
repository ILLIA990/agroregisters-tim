'use client';

import React from 'react';
import Link from 'next/link';
import '@/app/styles/footer.css'
import { useTranslations } from 'next-intl';

const Footer = () => {
    const t = useTranslations('Footer');

    return (
			<footer className='footer'>
				<div className='container-wide'>
					<div className='footer-top'>
						<div className='footer-left'>
							<h3 className='footer-title'>{t('title')}</h3>
							<div className='footer-logos'>
								<img src='/swiss.svg' alt='logo2' />
								<img src='/ifc-w.svg' alt='logo1' />
							</div>
						</div>
						<div className='footer-right'>
							<h4 className='footer-contact-title'>{t('title2')}</h4>
							<div className='footer-socials'>
								<a href='https://www.facebook.com/agroregisters/'>
									<img src='/facebook.svg'></img>
								</a>
							</div>
							<div className='contacts'>
								<a className='footer-contact' href='tel:+380731617085'>
									+38 073 161 70 85
								</a>
								<a
									className='footer-contact'
									href='mailto:admindp@agroregisters.com.ua'
								>
									admindp@agroregisters.com.ua
								</a>
								<p
									className='footer-contact'
									dangerouslySetInnerHTML={{ __html: t('adress') }}
								></p>
							</div>
						</div>
					</div>

					<div className='footer-bottom'>
						<p className='footer-copy'>{t('text1')}</p>
						<p className='footer-dev'>
							{t('text2')} <a href='https://e-life.com.ua/'>eLife</a>
						</p>
					</div>
				</div>
			</footer>
		)
};

export default Footer;
