import { MissingParams } from '@helpers/errors/missingParams';
import { CreateShortUrl } from '@modules/shortUrls/controllers/createShortUrl';

let saveShortUrl: any;

const makeSut = () => {
	return new CreateShortUrl();
};

describe('Create short url', () => {
	beforeEach(() => {
		saveShortUrl = makeSut();
	});
	test('Should return 400 when url is not provided', async () => {
		const response = await saveShortUrl.handle({
			body: { url: '', code: '12345' },
		});
		expect(response.status).toBe(400);
	});

	test('Should return an missing params error when url is not provided', async () => {
		const response = await saveShortUrl.handle({
			body: { url: '', code: '12345' },
		});
		expect(response.body).toStrictEqual({
			message: new MissingParams('Url'),
		});
	});

	test('Should return 400 when code is not provided', async () => {
		const response = await saveShortUrl.handle({
			body: { url: 'teste', code: '' },
		});
		expect(response.status).toBe(400);
	});

	test('Should return an missing params error when code is not provided', async () => {
		const response = await saveShortUrl.handle({
			body: { url: 'teste', code: '' },
		});
		expect(response.body).toStrictEqual({
			message: new MissingParams('Code'),
		});
	});
});
