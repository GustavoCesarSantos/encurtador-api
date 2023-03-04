import { MissingParams } from '@helpers/errors/missingParams';
import {
	ISaveShortenedUrl,
	SaveShortenedUrl,
} from '@modules/shortenedUrls/useCases/saveShortenedUrl';
import { EventManagerDummy } from '../../../testDoubles/dummy/eventManager';
import { ShortenedUrlRepositoryDummy } from '../../../testDoubles/dummy/shortenedUrlRepository';

let saveShortenedUrl: ISaveShortenedUrl;

const makeSut = () => {
	const shortUrlRepositoryDummy = new ShortenedUrlRepositoryDummy();
	const eventManagerDummy = new EventManagerDummy();
	return new SaveShortenedUrl(shortUrlRepositoryDummy, eventManagerDummy);
};

describe('Save short url', () => {
	beforeEach(() => {
		saveShortenedUrl = makeSut();
	});

	test('Should return an error when the url is not passed', async () => {
		const url = '';
		const code = '12345';
		const result = await saveShortenedUrl.execute(url, code);
		expect(result).toEqual(new MissingParams('root url'));
	});

	test('Should return an error when the code is not passed', async () => {
		const url = 'teste';
		const code = '';
		const result = await saveShortenedUrl.execute(url, code);
		expect(result).toEqual(new MissingParams('code'));
	});

	test('Should save short url schema', () => {
		const url = 'http://teste.com.br';
		const code = '12345';
		expect(() => saveShortenedUrl.execute(url, code)).not.toThrow();
	});
});
