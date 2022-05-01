import { ShortUrlRepositoryWithMemory } from '@infra/db/memory/shortUrlRepositoryWithMemory';
import { ShortUrl } from '@modules/shortUrls/shortUrl';
import { FindShortUrl } from '@modules/shortUrls/useCases/findShortUrl';
import { EventManagerDummy } from '../../../testDoubles/dummy/eventManager';

const makeSut = () => {
	const shortUrlRepository = new ShortUrlRepositoryWithMemory();
	const eventManagerDummy = new EventManagerDummy();
	return new FindShortUrl(shortUrlRepository, eventManagerDummy);
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
