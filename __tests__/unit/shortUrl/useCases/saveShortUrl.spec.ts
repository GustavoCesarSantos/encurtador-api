import { MissingParams } from '@helpers/errors/missingParams';
import {
	ISaveShortUrl,
	SaveShortUrl,
} from '@modules/shortUrls/useCases/saveShortUrl';
import { EventManagerDummy } from '../../../testDoubles/dummy/eventManager';
import { ShortUrlRepositoryDummy } from '../../../testDoubles/dummy/shortUrlRepository';

let saveShortUrl: ISaveShortUrl;

const makeSut = () => {
	const shortUrlRepositoryDummy = new ShortUrlRepositoryDummy();
	const eventManagerDummy = new EventManagerDummy();
	return new SaveShortUrl(shortUrlRepositoryDummy, eventManagerDummy);
};

describe('Save short url', () => {
	beforeEach(() => {
		saveShortUrl = makeSut();
	});

	test('Should return an error when the url is not passed', async () => {
		const url = '';
		const code = '12345';
		const result = await saveShortUrl.execute(url, code);
		expect(result).toEqual(new MissingParams('root url'));
	});

	test('Should return an error when the code is not passed', async () => {
		const url = 'teste';
		const code = '';
		const result = await saveShortUrl.execute(url, code);
		expect(result).toEqual(new MissingParams('code'));
	});

	test('Should save short url schema', () => {
		const url = 'http://teste.com.br';
		const code = '12345';
		expect(() => saveShortUrl.execute(url, code)).not.toThrow();
	});
});
