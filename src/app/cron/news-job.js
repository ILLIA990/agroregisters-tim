import cron from 'node-cron';
import { parseAllNews } from '@/app/lib/parser';
import { setCache } from '@/app/lib/cache';

cron.schedule('0 3 * * *', async () => {
    console.log('Парсинг новостей в 03:00...');
    const news = await parseAllNews();
    setCache(news);
});
