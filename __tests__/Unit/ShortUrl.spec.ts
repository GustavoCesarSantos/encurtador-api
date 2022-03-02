import { ShortUrl } from '@/shortUrls/shortUrl';

let shortUrl: ShortUrl;

const makeSut = (): ShortUrl => {
	return new ShortUrl({ url: 'teste', code: 'teste' });
};

describe('Short url', () => {
	beforeEach(() => {
		shortUrl = makeSut();
	});

	test('Should generate a code with five characters long', () => {
		expect(shortUrl.generateCode()).toHaveLength(5);
	});

	test('Should return a valid shortened url', () => {
		const code = shortUrl.generateCode();
		const result = shortUrl.returnShortUrl(code);
		expect(result).toBe(`${process.env.DOMAIN_URL}/${code}`);
	});

	test('Should return null if non-existent code is passed', () => {
		const code = 'error';
		const result = shortUrl.findRegistry(code);
		expect(result).toBeNull();
	});

	test('Should return short url registry', () => {
		const url = 'teste';
		const code = '12345';
		const result = shortUrl.findRegistry(code);
		expect(result?.url).toBe(url);
	});

	test('Should add new hit', () => {
		expect(() => shortUrl.addHit()).not.toThrow();
	});

	test('Should update url hits in infos', () => {
		const id = '1';
		const data = { hits: 2 };
		expect(() => shortUrl.updateHits(id, data)).not.toThrow();
	});
});
