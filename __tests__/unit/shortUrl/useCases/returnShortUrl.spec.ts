import {
	IReturnShortUrl,
	ReturnShortUrl,
} from '@modules/shortUrls/useCases/returnShortUrl';

let returnShortUrl: IReturnShortUrl;

const makeSut = () => {
	return new ReturnShortUrl();
};

describe('Return short url', () => {
	beforeEach(() => {
		returnShortUrl = makeSut();
	});

	test('Should return a valid domain in url', () => {
		const code = '12345';
		const result = returnShortUrl.execute(code);
		expect(result.split('/')[0]).toBe(`${process.env.DOMAIN_URL}`);
	});

	test('Should return a valid code in url', () => {
		const code = '12345';
		const result = returnShortUrl.execute(code);
		expect(result.split('/')[1]).toBe(code);
	});
});
