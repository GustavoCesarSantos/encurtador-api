import { ShortUrl } from '@/shortUrls/shortUrl';
import { MissingParams } from '../../src/helpers/errors/missingParams';

describe('Short url', () => {
	test('Should return an error when the url is not passed', () => {
		const props = { url: '', code: '12345' };
		const result = ShortUrl.create(props);
		expect(result).toEqual(new MissingParams('root url'));
	});

	test('Should return an error when the code is not passed', () => {
		const props = { url: 'teste', code: '' };
		const result = ShortUrl.create(props);
		expect(result).toEqual(new MissingParams('code'));
	});

	test('Should return a valid entity when all required params is passed', () => {
		const props = { url: 'teste', code: '12345' };
		const result = ShortUrl.create(props);
		expect(result instanceof ShortUrl).toBe(true);
	});
});
