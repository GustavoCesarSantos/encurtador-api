import {
	IReturnShortenedUrl,
	ReturnShortenedUrl,
} from '@modules/shortUrls/useCases/returnShortenedUrl';

let returnShortenedUrl: IReturnShortenedUrl;

const makeSut = () => {
	return new ReturnShortenedUrl();
};

describe('Return shortened url', () => {
	beforeEach(() => {
		returnShortenedUrl = makeSut();
	});

	test('Should return a valid domain in url', () => {
		const code = '12345';
		const result = returnShortenedUrl.execute(code);
		expect(result.split('/')[0]).toEqual(`${process.env.DOMAIN_URL}`);
	});

	test('Should return a valid code in url', () => {
		const code = '12345';
		const result = returnShortenedUrl.execute(code);
		expect(result.split('/')[1]).toEqual(code);
	});
});
