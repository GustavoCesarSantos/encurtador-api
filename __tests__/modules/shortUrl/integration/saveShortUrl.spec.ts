import { SaveShortUrl } from '@/shortUrls/useCases/saveShortUrl';
import { ShortUrlRepository } from '../../../../src/infra/db/memory/shortUrlRepository';

const shortUrlRepository = new ShortUrlRepository();

const makeSut = () => {
	return new SaveShortUrl(shortUrlRepository);
};

describe('Save short url', () => {
	test('Should save short url', async () => {
		const saveShortUrl = makeSut();
		const url = 'teste';
		const code = '12345';
		saveShortUrl.execute(url, code);
		const result = await shortUrlRepository.findOne(code);
		expect(result?.getCode()).toEqual(code);
	});
});
