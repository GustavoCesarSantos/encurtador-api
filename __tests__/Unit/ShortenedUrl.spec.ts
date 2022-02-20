import { ShortenedUrl } from '../../src/ShortenedUrl';

let shortenedUrl: ShortenedUrl;

const makeSut = (): ShortenedUrl => {
	return new ShortenedUrl();
};

describe('Shortened url', () => {
	beforeEach(() => {
		shortenedUrl = makeSut();
	});

	test('Should generate a code with five characters long', () => {
		expect(shortenedUrl.generateCode()).toHaveLength(5);
	});

	test('Should save original url in database', () => {
		const url = 'teste';
		expect(() => shortenedUrl.save(url)).not.toThrow();
	});

	test('Should return a valid shortened url', () => {
		const code = shortenedUrl.generateCode();
		const url = shortenedUrl.returnShortenedUrl(code);
		expect(url).toBe(`${process.env.DOMAIN_URL}/${code}`);
	});

	test('Should return the original url', () => {
		const url = 'teste';
		const code = '12345';
		const returnedUrl = shortenedUrl.returnOriginalUrl(code);
		expect(returnedUrl).toBe(url);
	});

	test('Should add new hit', () => {
		expect(() => shortenedUrl.addHit()).not.toThrow();
	});

	test('Should update url hits in infos', () => {
		const id = '1';
		const data = { hits: 2 };
		expect(() => shortenedUrl.updateHits(id, data)).not.toThrow();
	});

	test('Should return url infos', () => {
		const code = '12345';
		const document = shortenedUrl.findUrlInfos(code);
		expect(document).toEqual({
			code: '12345',
			hits: 0,
			id: '1',
			url: 'teste',
		});
	});
});
