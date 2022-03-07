import { ShortUrl } from '@/shortUrls/shortUrl';

let shortUrl: ShortUrl;

const makeSut = (): ShortUrl => {
	return new ShortUrl({ url: 'teste', code: 'teste' });
};

describe('Short url', () => {
	beforeEach(() => {
		shortUrl = makeSut();
	});

	test('Should return a valid shortened url', () => {
		const code = '12345';
		const result = shortUrl.returnShortUrl(code);
		expect(result).toBe(`${process.env.DOMAIN_URL}/${code}`);
	});
});
