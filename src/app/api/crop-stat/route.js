export async function GET(req) {
	try {
		const { searchParams } = new URL(req.url);
		const year = searchParams.get('year');

		const url = year
			? `https://api.agroregisters.com.ua/api/cropreceipts/public/Statistic/${year}`
			: `https://api.agroregisters.com.ua/api/cropreceipts/public/Statistic`;

		const response = await fetch(url);

		if (!response.ok) {
			return new Response(
				JSON.stringify({ error: 'Ошибка при получении данных' }),
				{ status: response.status }
			);
		}

		const data = await response.json();
		return new Response(JSON.stringify(data), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Серверная ошибка' }), {
			status: 500,
		});
	}
}
