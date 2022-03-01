import { ISaveShortUrl, SaveShortUrl } from '@/shortUrls/useCases/saveShortUrl';

let saveShortUrl: ISaveShortUrl;

const makeSut = () => {
	return new SaveShortUrl();
};

describe('Save short url', () => {
	beforeEach(() => {
		saveShortUrl = makeSut();
	});

	test('Should save short url', () => {
		expect(() => saveShortUrl.execute()).not.toThrow();
	});
});
