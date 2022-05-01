import { ShortUrlRepositoryWithMemory } from '@infra/db/memory/shortUrlRepositoryWithMemory';
import { SaveShortUrl } from '@modules/shortUrls/useCases/saveShortUrl';
import { EventManagerDummy } from '../../../testDoubles/dummy/eventManager';

const shortUrlRepository = new ShortUrlRepositoryWithMemory();

const makeSut = () => {
	const eventManagerDummy = new EventManagerDummy();
	return new SaveShortUrl(shortUrlRepository, eventManagerDummy);
};

describe('Save short url', () => {
	test('Should save short url', async () => {
		const saveShortUrl = makeSut();
		const url = 'teste';
		const code = '12345';
		saveShortUrl.execute(url, code);
		const result = await shortUrlRepository.getShortUrlByCode(code);
		expect(result?.getCode()).toBe(code);
	});
});
