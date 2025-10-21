export async function GET(request) {
    const baseUrl = 'https://sitenew.agroregisters.com.ua/wp-json/wp/v2/knowledge';
    const perPage = 100;
    let page = 1;
    let allPosts = [];
    let totalPages = 1;

    try {
        while (page <= totalPages) {
            const res = await fetch(`${baseUrl}?per_page=${perPage}&page=${page}&_embed`, {
                next: { revalidate: 60 },
            });

            if (!res.ok) {
                return new Response(JSON.stringify({ error: `Ошибка на странице ${page}` }), {
                    status: res.status,
                    headers: { 'Content-Type': 'application/json' },
                });
            }

            const pageData = await res.json();

            if (page === 1) {
                totalPages = parseInt(res.headers.get('x-wp-totalpages')) || 1;
            }

            allPosts = allPosts.concat(pageData);
            page++;
        }

        const result = allPosts.map(post => ({
            id: post.id,
            title: post.title.rendered,
            link: post.link,
            type: post.acf?.type || null,
            text: post.acf?.text || '',
            file: post.acf?.file || '',
            video: post.acf?.type === 'video' ? post.acf?.text : '',
            category: post.knowledgecat,
        }));

        return new Response(JSON.stringify(result), {
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
