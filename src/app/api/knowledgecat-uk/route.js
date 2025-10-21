export async function GET() {
    const apiUrl = 'https://sitenew.agroregisters.com.ua/wp-json/wp/v2/knowledgecat?lang=uk&per_page=100';

    try {
        const res = await fetch(apiUrl);

        if (!res.ok) {
            return new Response(JSON.stringify({ error: 'Не вдалося отримати категорії' }), {
                status: res.status,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const data = await res.json();

        const formatted = data.map((cat) => ({
            id: cat.id,
            description: cat.description,
            name: cat.name,
            slug: cat.slug,
            count: cat.count,
            parent: cat.parent,
        }));

        return new Response(JSON.stringify({ categories: formatted }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 's-maxage=120, stale-while-revalidate',
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Помилка сервера', details: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
