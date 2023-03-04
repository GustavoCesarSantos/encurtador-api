import { MissingParams } from '@helpers/errors/missingParams';
import { ShortenedUrl } from '@modules/shortenedUrls/shortenedUrl';

describe('Shortened url', () => {
	test('Should return an error when the url is not passed', () => {
		const props = { url: '', code: '12345' };
		const result = ShortenedUrl.create(props);
		expect(result).toEqual(new MissingParams('root url'));
	});

	test('Should return an error when the code is not passed', () => {
		const props = { url: 'teste', code: '' };
		const result = ShortenedUrl.create(props);
		expect(result).toEqual(new MissingParams('code'));
	});

	test('Should return a valid entity when all required params is passed', () => {
		const props = { url: 'teste', code: '12345' };
		const result = ShortenedUrl.create(props);
		expect(result instanceof ShortenedUrl).toBe(true);
	});
});
