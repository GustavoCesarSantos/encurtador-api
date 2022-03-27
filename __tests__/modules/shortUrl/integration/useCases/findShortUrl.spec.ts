import { ShortUrlRepositoryWithMemory } from '@infra/db/memory/shortUrlRepositoryWithMemory';
import { ShortUrl } from '@modules/shortUrls/shortUrl';
import { FindShortUrl } from '@modules/shortUrls/useCases/findShortUrl';

const shortUrlRepository = new ShortUrlRepositoryWithMemory();

const makeSut = () => {
	return new FindShortUrl(shortUrlRepository);
};

describe('Find short url', () => {
	test('Should return null when the short url schema is not found', async () => {
		const code = 'fail';
		const findShortUrl = makeSut();
		const result = await findShortUrl.execute(code);
		expect(result).toBeNull();
	});

	test('Should return the short url schema found', async () => {
		const code = 'success';
		const findShortUrl = makeSut();
		const result = await findShortUrl.execute(code);
		expect(result instanceof ShortUrl).toBe(true);
	});
});
