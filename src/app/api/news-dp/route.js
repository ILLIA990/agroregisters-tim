export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || 1;
    const perPage = searchParams.get('per_page') || 20;

    const apiUrl = `https://sitenew.agroregisters.com.ua/wp-json/wp/v2/posts?per_page=${perPage}&page=${page}`;

    try {
        const res = await fetch(apiUrl);
        if (!res.ok) {
            return new Response(JSON.stringify({ error: 'Ошибка при запросе к WordPress API' }), {
                status: res.status,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const data = await res.json();
        const totalPages = res.headers.get('x-wp-totalpages') || '1';

        return new Response(JSON.stringify({ posts: data, totalPages: Number(totalPages) }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 's-maxage=60, stale-while-revalidate',
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Ошибка сервера', details: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

