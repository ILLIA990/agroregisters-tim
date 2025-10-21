import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import Footer from '../components/generall/Footer';
import HeaderDesk from '../components/generall/HeaderDesk';
import "@/app/styles/globals.css";
import '@/app/styles/style.css';
import Header from "@/app/components/generall/Header";

export const metadata = {
  title: "Ukraine Agroregisters",
  description: "Made by eLife",
};

export default async function LocaleLayout({children, params}) {
  const {locale} = await params;
  
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          <div>
            <Header/>
            {children}
            <Footer/>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
