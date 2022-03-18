import { FindShortUrl } from '@/shortUrls/useCases/findShortUrl';
import { ShortUrlRepository } from '../../../../src/infra/db/memory/shortUrlRepository';

const shortUrlRepository = new ShortUrlRepository();

const makeSut = () => {
	return new FindShortUrl(shortUrlRepository);
};

describe('Find short url', () => {
	test('Should return an empty array when the short url is not found', async () => {
		const code = 'fail';
		const findShortUrl = makeSut();
		const result = await findShortUrl.execute(code);
		expect(result).toHaveLength(0);
	});

	test('Should return an array with only the short url found', async () => {
		const code = 'success';
		const findShortUrl = makeSut();
		const result = await findShortUrl.execute(code);
		expect(result).toHaveLength(1);
	});
});
