import { ISaveShortUrl, SaveShortUrl } from '@/shortUrls/useCases/saveShortUrl';

let saveShortUrl: ISaveShortUrl;

const makeSut = () => {
	return new SaveShortUrl();
};

describe('Save short url', () => {
	beforeEach(() => {
		saveShortUrl = makeSut();
	});

	test('Should save short url schema', () => {
		const url = 'http://teste.com.br';
		const code = '12345';
		expect(() => saveShortUrl.execute(url, code)).not.toThrow();
	});
});
