import { ShortUrl } from '@/shortUrls/shortUrl';

describe('Short url', () => {
	test('Should create a entity short url', () => {
		expect(
			() => new ShortUrl({ url: 'teste', code: 'teste' }),
		).not.toThrow();
	});

	// test('Should return a valid shortened url', () => {
	// 	const code = '12345';
	// 	const result = shortUrl.returnShortUrl(code);
	// 	expect(result).toBe(`${process.env.DOMAIN_URL}/${code}`);
	// });
});
