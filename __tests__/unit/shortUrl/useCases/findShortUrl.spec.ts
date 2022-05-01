import { ShortUrl } from '@modules/shortUrls/shortUrl';
import { FindShortUrl } from '@modules/shortUrls/useCases/findShortUrl';
import { EventManagerDummy } from '../../../testDoubles/dummy/eventManager';
import { ShortUrlRepositoryStub } from '../../../testDoubles/stub/shortUrlRepository';

let findShortUrl: FindShortUrl;

const makeSut = () => {
	const shortUrlRepositoryStub = new ShortUrlRepositoryStub();
	const eventManagerDummy = new EventManagerDummy();
	return new FindShortUrl(shortUrlRepositoryStub, eventManagerDummy);
};

describe('Find short url', () => {
	beforeEach(() => {
		findShortUrl = makeSut();
	});

	test('Should return null when the short url schema is not found', async () => {
		const result = await findShortUrl.execute('fail');
		expect(result).toBeNull();
	});

	test('Should the short url schema found', async () => {
		const result = await findShortUrl.execute('success');
		expect(result instanceof ShortUrl).toBe(true);
	});
});
