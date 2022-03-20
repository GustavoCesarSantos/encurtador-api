import { MissingParams } from '@helpers/errors/missingParams';
import { CreateShortUrl } from '@modules/shortUrls/controllers/createShortUrl';
import { IGenerateCode } from '@modules/shortUrls/useCases/generateCode';
import { IReturnShortenedUrl } from '@modules/shortUrls/useCases/returnShortenedUrl';

let saveShortUrl: any;

class GenerateCodeDummie implements IGenerateCode {
	execute(): string {
		return '';
	}
}

class ReturnShortenedUrlDummie implements IReturnShortenedUrl {
	execute(code: string): string {
		return '';
	}
}

const makeSut = () => {
	const generateCode = new GenerateCodeDummie();
	const returnShortenedUrl = new ReturnShortenedUrlDummie();
	return new CreateShortUrl({ generateCode, returnShortenedUrl });
};

describe('Create short url', () => {
	beforeEach(() => {
		saveShortUrl = makeSut();
	});
	test('Should return 400 when url is not provided', async () => {
		const response = await saveShortUrl.handle({
			body: { url: '' },
		});
		expect(response.status).toBe(400);
	});

	test('Should return an missing params error when url is not provided', async () => {
		const response = await saveShortUrl.handle({
			body: { url: '' },
		});
		expect(response.body).toStrictEqual({
			message: new MissingParams('Url'),
		});
	});

	test('Should return 201 when shortened url is created', async () => {
		const response = await saveShortUrl.handle({
			body: { url: 'teste' },
		});
		expect(response.status).toBe(201);
	});

	test('Should return a shortened url', async () => {
		const response = await saveShortUrl.handle({
			body: { url: 'teste' },
		});
		expect(response.body.url).not.toBeUndefined();
	});
});
