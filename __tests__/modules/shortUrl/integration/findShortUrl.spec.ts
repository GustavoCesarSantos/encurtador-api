import { ShortUrl } from '@/shortUrls/shortUrl';
import { FindShortUrl } from '@/shortUrls/useCases/findShortUrl';
import { ShortUrlRepository } from '../../../../src/infra/db/memory/shortUrlRepository';

const shortUrlRepository = new ShortUrlRepository();

const makeSut = () => {
	return new FindShortUrl(shortUrlRepository);
};

describe('Find short url', () => {
	test('Should return a empty array when the short url is not found', async () => {
		const findShortUrl = makeSut();
		const code = '12345';
		const result = await findShortUrl.execute(code);
		expect(result).toHaveLength(0);
	});
});
