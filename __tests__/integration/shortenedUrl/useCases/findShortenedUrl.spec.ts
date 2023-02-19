import { ShortenedUrlRepositoryWithMemory } from '@infra/db/memory/shortenedUrlRepositoryWithMemory';
import { ShortenedUrl } from '@modules/shortenedUrls/shortenedUrl';
import { FindShortenedUrl } from '@modules/shortenedUrls/useCases/findShortenedUrl';
import { EventManagerDummy } from '../../../testDoubles/dummy/eventManager';

const makeSut = () => {
	const shortUrlRepository = new ShortenedUrlRepositoryWithMemory();
	const eventManagerDummy = new EventManagerDummy();
	return new FindShortenedUrl(shortUrlRepository, eventManagerDummy);
};

describe('Find short url', () => {
	test('Should return null when the short url schema is not found', async () => {
		const code = 'fail';
		const findShortenedUrl = makeSut();
		const result = await findShortenedUrl.execute(code);
		expect(result).toBeNull();
	});

	test('Should return the short url schema found', async () => {
		const code = 'success';
		const findShortenedUrl = makeSut();
		const result = await findShortenedUrl.execute(code);
		expect(result instanceof ShortenedUrl).toBe(true);
	});
});
