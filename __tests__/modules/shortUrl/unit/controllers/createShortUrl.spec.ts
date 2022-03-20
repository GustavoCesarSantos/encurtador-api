import { MissingParams } from '@helpers/errors/missingParams';
import { CreateShortUrl } from '@modules/shortUrls/controllers/createShortUrl';
import { IGenerateCode } from '@modules/shortUrls/useCases/generateCode';
import { IReturnShortUrl } from '@modules/shortUrls/useCases/returnShortUrl';
import { ISaveShortUrl } from '@modules/shortUrls/useCases/saveShortUrl';

let saveShortUrl: any;

class GenerateCodeDummie implements IGenerateCode {
	execute(): string {
		return '';
	}
}

class ReturnShortUrlDummie implements IReturnShortUrl {
	execute(code: string): string {
		return '';
	}
}

class SaveShortUrlDummie implements ISaveShortUrl {
	async execute(url: string, code: string): Promise<void | Error> {
		return;
	}
}

const makeSut = () => {
	const generateCode = new GenerateCodeDummie();
	const returnShortUrl = new ReturnShortUrlDummie();
	const saveShortUrl = new SaveShortUrlDummie();
	return new CreateShortUrl({ generateCode, returnShortUrl, saveShortUrl });
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

	test('Should return 201 when short url is created', async () => {
		const response = await saveShortUrl.handle({
			body: { url: 'teste' },
		});
		expect(response.status).toBe(201);
	});

	test('Should return a short url', async () => {
		const response = await saveShortUrl.handle({
			body: { url: 'teste' },
		});
		expect(response.body.url).not.toBeUndefined();
	});
});
