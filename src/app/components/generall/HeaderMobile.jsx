'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import SearchOverlay from '@/app/components/search/SearchOverlay';
import '@/app/styles/header.css';

const MobileHeader = () => {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const currentLocale = useLocale();
    const otherLocales = ['uk', 'en'].filter((l) => l !== currentLocale);
    const pathWithoutLocale = pathname.replace(/^\/(uk|en|ru)/, '');
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

    const handleLinkClick = () => {
        setMenuOpen(false);
    };

    return (
			<>
				<header className='mobile-header'>
					<div className='mobile-header-container'>
						<div className='buttons'>
							<button
								className='burger-button'
								onClick={() => setMenuOpen(!menuOpen)}
								aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
							>
								<img src={menuOpen ? '/close.png' : '/burger.png'} alt='Меню' />
							</button>

							<button
								className='search-toggle-btn'
								onClick={() => setShowSearch(true)}
							>
								<img src='/search.svg' alt='Пошук' />
							</button>
						</div>

						<div className='mobile-logo'>
							<Link href='/' onClick={handleLinkClick}>
								<Image
									src='https://sitenew.agroregisters.com.ua/wp-content/uploads/2025/05/logo.svg'
									alt='Agroregisters'
									width={90}
									height={30}
								/>
							</Link>
						</div>

						<Link
							href='https://new.agroregisters.com.ua/account/login'
							className='mobile-login-button'
							onClick={handleLinkClick}
						>
							{t('button2')}
						</Link>
					</div>

					{menuOpen && (
						<nav className='mobile-menu'>
							<Link
								href='/crop-receipts-register'
								className='mobile-nav-link'
								onClick={handleLinkClick}
							>
								{t('chapter1.title')}
							</Link>
							<div className='mobile-submenu'>
								<a
									href='https://new.agroregisters.com.ua/dashboard/public/search'
									target='_blank'
									rel='noopener noreferrer'
									onClick={handleLinkClick}
								>
									{t('chapter1.text1')}
								</a>
								<a
									href='https://new.agroregisters.com.ua/account/login'
									target='_blank'
									rel='noopener noreferrer'
									onClick={handleLinkClick}
								>
									{t('chapter1.text2')}
								</a>
								<Link href='/templates-documents' onClick={handleLinkClick}>
									{t('chapter1.text3')}
								</Link>
								<a
									href='https://feodal.online/'
									target='_blank'
									rel='noopener noreferrer'
									onClick={handleLinkClick}
								>
									{t('chapter1.text4')}
								</a>
								<Link
									href='/knowledge/notaries-extra'
									onClick={handleLinkClick}
								>
									{t('chapter1.text5')}
								</Link>
							</div>

							<Link
								href='/knowledge'
								className='mobile-nav-link'
								onClick={handleLinkClick}
							>
								{t('chapter2.title')}
							</Link>
							<div className='mobile-submenu'>
								<Link
									href={`/knowledge/category/${categoryMap[6]}`}
									onClick={handleLinkClick}
								>
									{t('chapter2.text1')}
								</Link>
								<Link
									href={`/knowledge/category/${categoryMap[4]}`}
									onClick={handleLinkClick}
								>
									{t('chapter2.text2')}
								</Link>
								<Link
									href={`/knowledge/category/${categoryMap[13]}`}
									onClick={handleLinkClick}
								>
									{t('chapter2.text3')}
								</Link>
								<Link
									href={`/knowledge/category/${categoryMap[5]}`}
									onClick={handleLinkClick}
								>
									{t('chapter2.text4')}
								</Link>
								<Link
									href={`/knowledge/category/${categoryMap[14]}`}
									onClick={handleLinkClick}
								>
									{t('chapter2.text5')}
								</Link>
							</div>

							<Link
								href='/notaries'
								className='mobile-nav-link'
								onClick={handleLinkClick}
							>
								{t('chapter3.title')}
							</Link>
							<div className='mobile-submenu'>
								<Link href='/notaries?view=top' onClick={handleLinkClick}>
									{t('chapter3.text1')}
								</Link>
								<Link href='/notaries?view=all' onClick={handleLinkClick}>
									{t('chapter3.text2')}
								</Link>
							</div>

							<Link
								href='/legal'
								className='mobile-nav-link'
								onClick={handleLinkClick}
							>
								{t('chapter4.title')}
							</Link>
							<div className='mobile-submenu'>
								<Link href='/map' onClick={handleLinkClick}>
									{t('chapter4.text2')}
								</Link>
								<Link href='/history-of-success' className={`dropdown-item`}>
									{t('chapter4.text4')}
								</Link>

								<Link href='/legal' onClick={handleLinkClick}>
									{t('chapter4.text1')}
								</Link>
								<Link href='/faq' onClick={handleLinkClick}>
									{t('chapter4.text3')}
								</Link>
							</div>

							<Link
								href='/news'
								className='mobile-nav-link'
								onClick={handleLinkClick}
							>
								{t('chapter5.title')}
							</Link>
							<div className='mobile-submenu'>
								<Link href='/news?tab=dp' onClick={handleLinkClick}>
									{t('chapter5.text1')}
								</Link>
								<Link href='/news?tab=agrosphere' onClick={handleLinkClick}>
									{t('chapter5.text2')}
								</Link>
							</div>

							<Link
								href='/contacts'
								className='mobile-nav-link'
								onClick={handleLinkClick}
							>
								{t('chapter6')}
							</Link>

							<div className='mobile-languages'>
								<img src='/world.svg' alt='Язык' />
								{otherLocales.map(locale => (
									<Link
										key={locale}
										href={`/${locale}${pathWithoutLocale}`}
										locale={locale}
										className='lang-link'
										onClick={handleLinkClick}
									>
										{locale === 'uk' ? 'Українська' : 'English'}
									</Link>
								))}
							</div>

							<a
								href='tel:+380665678832'
								className='mobile-phone'
								onClick={handleLinkClick}
							>
								<img src='/phone-call.svg' alt='Телефон' />
								+380 66 567 88 32
							</a>
						</nav>
					)}
				</header>

				<SearchOverlay
					isOpen={showSearch}
					onClose={() => setShowSearch(false)}
				/>
			</>
		)
};

export default MobileHeader;
