import { ShortenedUrlRepositoryWithMemory } from '@infra/db/memory/shortenedUrlRepositoryWithMemory';
import { SaveShortenedUrl } from '@modules/shortenedUrls/useCases/saveShortenedUrl';
import { EventManagerDummy } from '../../../testDoubles/dummy/eventManager';

const shortUrlRepository = new ShortenedUrlRepositoryWithMemory();

const makeSut = () => {
	const eventManagerDummy = new EventManagerDummy();
	return new SaveShortenedUrl(shortUrlRepository, eventManagerDummy);
};

describe('Save short url', () => {
	test('Should save short url', async () => {
		const saveShortenedUrl = makeSut();
		const url = 'teste';
		const code = '12345';
		saveShortenedUrl.execute(url, code);
		const result = await shortUrlRepository.getShortenedUrlByCode(code);
		expect(result?.getCode()).toBe(code);
	});
});
