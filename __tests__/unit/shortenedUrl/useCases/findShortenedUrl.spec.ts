import { ShortenedUrl } from '@modules/shortenedUrls/shortenedUrl';
import { FindShortenedUrl } from '@modules/shortenedUrls/useCases/findShortenedUrl';
import { EventManagerDummy } from '../../../testDoubles/dummy/eventManager';
import { ShortenedUrlRepositoryStub } from '../../../testDoubles/stub/shortUrlRepository';

let findShortenedUrl: FindShortenedUrl;

const makeSut = () => {
	const shortUrlRepositoryStub = new ShortenedUrlRepositoryStub();
	const eventManagerDummy = new EventManagerDummy();
	return new FindShortenedUrl(shortUrlRepositoryStub, eventManagerDummy);
};

describe('Find short url', () => {
	beforeEach(() => {
		findShortenedUrl = makeSut();
	});

	test('Should return null when the short url schema is not found', async () => {
		const result = await findShortenedUrl.execute('fail');
		expect(result).toBeNull();
	});

	test('Should the short url schema found', async () => {
		const result = await findShortenedUrl.execute('success');
		expect(result instanceof ShortenedUrl).toBe(true);
	});
});
