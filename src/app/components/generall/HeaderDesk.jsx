'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import '@/app/styles/style.css';
import SearchOverlay from '@/app/components/search/SearchOverlay';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';

const HeaderDesk = () => {
    const pathname = usePathname();
    const [showSearch, setShowSearch] = useState(false);
    const currentLocale = useLocale();
    const otherLocales = ['uk', 'en'].filter((l) => l !== currentLocale);
    const pathWithoutLocale = pathname.replace(/^\/(uk|en)/, '');
    const t = useTranslations('Header');
    const locale = useLocale();


    const categoryMap = locale === 'en'
        ? {
            6: 51,
            4: 48,
            13: 65,
            5: 49,
            14: 67,
        }
        : {
            6: 6,
            4: 4,
            13: 13,
            5: 5,
            14: 14,
        };
    const categoryIds = Object.values(categoryMap);
    const isActive = pathname === '/knowledge' || categoryIds.some(id => pathname === `/knowledge/category/${id}`);

    return (
			<>
				<header className='site-header'>
					<div className='header-container wide'>
						<div className='header-logo'>
							<Link href='/'>
								<Image
									src='https://sitenew.agroregisters.com.ua/wp-content/uploads/2025/05/logo.svg'
									alt='Agroregisters'
									width={105}
									height={40}
								/>
							</Link>
						</div>

						<nav className='main-nav'>
							<a
								href='/crop-receipts-register'
								className={`nav-link ${
									pathname === '/crop-receipts-register' ||
									pathname === '/templates-documents' ||
									pathname === '/knowledge/notaries-extra'
										? 'active'
										: ''
								} dropdown-wrapper`}
							>
								{t('chapter1.title')}
								<div className='dropdown-content'>
									<a
										href='https://new.agroregisters.com.ua/dashboard/public/search'
										className={`dropdown-item`}
										target='_blank'
										rel='noopener noreferrer'
									>
										{t('chapter1.text1')}
									</a>
									<a
										href='https://new.agroregisters.com.ua/account/login'
										className={`dropdown-item`}
										target='_blank'
										rel='noopener noreferrer'
									>
										{t('chapter1.text2')}
									</a>
									<Link href='/templates-documents' className={`dropdown-item`}>
										{t('chapter1.text3')}
									</Link>
									<a
										href='https://feodal.online/'
										className={`dropdown-item`}
										target='_blank'
										rel='noopener noreferrer'
									>
										{t('chapter1.text4')}
									</a>
									<Link
										href='/knowledge/notaries-extra'
										className={`dropdown-item`}
									>
										{t('chapter1.text5')}
									</Link>
								</div>
							</a>
							<Link
								href='/knowledge'
								className={`nav-link ${
									isActive ? 'active' : ''
								} dropdown-wrapper`}
							>
								{t('chapter2.title')}
								<div className='dropdown-content'>
									<Link
										href={`/knowledge/category/${categoryMap[6]}`}
										className='dropdown-item'
									>
										{t('chapter2.text1')}
									</Link>
									<Link
										href={`/knowledge/category/${categoryMap[4]}`}
										className='dropdown-item'
									>
										{t('chapter2.text2')}
									</Link>
									<Link
										href={`/knowledge/category/${categoryMap[13]}`}
										className='dropdown-item'
									>
										{t('chapter2.text3')}
									</Link>
									<Link
										href={`/knowledge/category/${categoryMap[5]}`}
										className='dropdown-item'
									>
										{t('chapter2.text4')}
									</Link>
									<Link
										href={`/knowledge/category/${categoryMap[14]}`}
										className='dropdown-item'
									>
										{t('chapter2.text5')}
									</Link>
								</div>
							</Link>
							<Link
								href='/notaries'
								className={`nav-link ${
									pathname === '/notaries' ? 'active' : ''
								} dropdown-wrapper`}
							>
								{t('chapter3.title')}
								<div className='dropdown-content'>
									<Link href='/notaries?view=top' className={`dropdown-item`}>
										{t('chapter3.text1')}
									</Link>
									<Link href='/notaries?view=all' className={`dropdown-item`}>
										{t('chapter3.text2')}
									</Link>
								</div>
							</Link>

							<a
								className={`nav-link ${
									pathname === '/map' ||
									pathname === '/legal' ||
									pathname === '/faq' ||
									pathname === '/history-of-success'
										? 'active'
										: ''
								} dropdown-wrapper`}
							>
								{t('chapter4.title')}
								<div className='dropdown-content'>
									<Link href='/map' className={`dropdown-item`}>
										{t('chapter4.text2')}
									</Link>
									<Link href='/history-of-success' className={`dropdown-item`}>
										{t('chapter4.text4')}
									</Link>
									<Link href='/legal' className={`dropdown-item`}>
										{t('chapter4.text1')}
									</Link>
									<Link href='/faq' className={`dropdown-item`}>
										{t('chapter4.text3')}
									</Link>
								</div>
							</a>
							<Link
								href='/news'
								className={`nav-link ${
									pathname === '/news' ? 'active' : ''
								} dropdown-wrapper`}
							>
								{t('chapter5.title')}
								<div className='dropdown-content'>
									<Link href='/news?tab=dp' className={`dropdown-item`}>
										{t('chapter5.text1')}
									</Link>
									<Link href='/news?tab=agrosphere' className={`dropdown-item`}>
										{t('chapter5.text2')}
									</Link>
								</div>
							</Link>
							<Link
								href='/contacts'
								className={`nav-link ${
									pathname === '/contacts' ? 'active' : ''
								}`}
							>
								{t('chapter6')}
							</Link>
						</nav>

						<div className='header-actions'>
							<div className='header-actions-container'>
								<button
									onClick={() => setShowSearch(true)}
									className='search-toggle-btn'
									aria-label='Пошук'
								>
									<img src='/search.svg' alt='пошук' />
								</button>
								<a className='dropdown-wrapper'>
									<img src='/world.svg' alt='Language' />
									<div className='dropdown-content'>
										{['uk', 'en'].map(locale => (
											<Link
												key={locale}
												href={`/${locale}${pathWithoutLocale}`}
												locale={locale}
												className='dropdown-item'
											>
												{locale === 'uk' ? 'Українська' : 'English'}
											</Link>
										))}
									</div>
								</a>
							</div>

							<Link
								href='https://new.agroregisters.com.ua/account/login'
								className='login-button'
							>
								{t('button')}
							</Link>
						</div>
					</div>
				</header>

				<SearchOverlay
					isOpen={showSearch}
					onClose={() => setShowSearch(false)}
				/>
			</>
		)
};

export default HeaderDesk;
