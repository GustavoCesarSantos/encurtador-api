import { ShortUrlRepository } from '@infra/db/memory/shortUrlRepository';
import { FindShortUrl } from '@modules/shortUrls/useCases/findShortUrl';

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
