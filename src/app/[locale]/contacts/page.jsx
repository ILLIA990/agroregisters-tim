'use client';
import { useTranslations } from 'next-intl';
import '@/app/styles/contacs.css';
import '@/app/styles/style.css';

export default function ContactsPage() {
    const t = useTranslations('Contacts');

    return (
			<div className='page'>
				<div className='contact-grid'>
					<div className='contact-image'>
						<img
							src='/image-contacsts.png'
							alt={t('imageAlt')}
							className='rounded-image'
						/>
					</div>
					<div className='contact-info'>
						<h1 dangerouslySetInnerHTML={{ __html: t.raw('title') }} />
						<p>{t('addressPhysical')}</p>
						<p>
							<b>{t('addressMailing.label')}</b>
							<br />
							{t('addressMailing.value')}
						</p>
						<p>
							<b>{t('director.label')}</b>
							<br />
							<div className='contacts-logo'>
								<div className='phone'>
									<img src='/call-contacts.svg' alt='phone' />
									<a href='tel:0731617085'>{t('phone')}</a>
									<br />
								</div>
								<div className='email'>
									<img src='/email-contacts.svg' alt='email' />
									<a href='mailto:admindp@agroregisters.com.ua'>
										admindp@agroregisters.com.ua
									</a>
								</div>
							</div>
						</p>
						<p>
							<b>{t('support.label')}</b>
							<br />
							<div className='contacts-logo'>
								<div className='phone'>
									<img src='/call-contacts.svg' alt='phone' />
									<a href='tel:0731617085'>{t('phone')}</a>
									<br />
								</div>
								<div className='email'>
									<img src='/email-contacts.svg' alt='email' />
									<a href='mailto:admindp@agroregisters.com.ua'>
										admindp@agroregisters.com.ua
									</a>
								</div>
							</div>
						</p>
						<div className='contact-social'>
							<a
								href='https://www.facebook.com/agroregisters/'
								target='_blank'
								rel='noreferrer'
							>
								<img
									src='/facebook-green.svg'
									alt='Facebook'
									width={24}
									height={24}
								/>
							</a>
						</div>
					</div>
				</div>
			</div>
		)
}
