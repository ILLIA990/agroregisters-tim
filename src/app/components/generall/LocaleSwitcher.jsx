'use client';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import Link from 'next/link';

export default function LocaleSwitcher() {
    const pathname = usePathname();
    const currentLocale = useLocale();
    const locales = ['en', 'uk'];

    return (
        <div>
            {locales.map((locale) => (
                <Link
                    key={locale}
                    href={pathname}
                    locale={locale}
                    scroll={false}
                    className={locale === currentLocale ? 'active' : ''}
                >
                    {locale.toUpperCase()}
                </Link>
            ))}
        </div>
    );
}
