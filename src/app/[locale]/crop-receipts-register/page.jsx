'use client';

import Image from 'next/image';
import '@/app/styles/style.css'
import '@/app/styles/rar.css'
import { useTranslations } from 'next-intl';

export default function RarPage() {
    const t = useTranslations('Document_Templates');

    return (
			<div className='page'>
			<div className="divide-two-parts rar-divide"></div>
				<div className='divide-two-parts'>
					<div className='access-block public'>
						<div className='rar-header'>
							<h1>{t('block_first.title')}</h1>
							<img src='/three-people.svg' alt='Публічний доступ' />
						</div>
						<a
							className='button-first'
							href='https://new.agroregisters.com.ua/dashboard/public/search'
						>
							{t('block_first.button_text')}
						</a>
						<div className='rar-content'>
							<p>{t('block_first.text1')}</p>
							<br />
							<p>{t('block_first.text2')}</p>
							<ul>
								<li>{t('block_first.list1.0')}</li>
								<li>{t('block_first.list1.1')}</li>
								<li>{t('block_first.list1.2')}</li>
								<li>{t('block_first.list1.3')}</li>
							</ul>
							<img src='/rar-img.png' alt='Пошук розписок' />
							<p>{t('block_first.text3')}</p>
							<br />
							<p>{t('block_first.text4')}</p>
							<ul>
								<li>{t('block_first.list2.0')}</li>
								<li>{t('block_first.list2.1')}</li>
								<li>{t('block_first.list2.2')}</li>
							</ul>
							<p>{t('block_first.text5')}</p>
							<a
								style={{
									color: '#2C7341',
								}}
								href='/pub21.pdf'
								className='download-link'
							>
								{t('block_first.text5_a')}
							</a>
						</div>
					</div>

					<div className='access-block private'>
						<div className='rar-header'>
							<h1>{t('block_second.title')}</h1>
							<img src='/simplified-icon-of-contract.svg' alt='Нотаріус' />
						</div>
						<a
							className='button-second'
							href='https://new.agroregisters.com.ua/account/login'
						>
							{t('block_second.button_text')}
						</a>
						<div className='rar-content'>
							<p>{t('block_second.text1')}</p>
							<br />
							<p>{t('block_second.text2')}</p>
						</div>
					</div>
				</div>
			</div>
		)
}
