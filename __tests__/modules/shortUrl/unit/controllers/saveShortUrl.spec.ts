import { MissingParams } from '@helpers/errors/missingParams';
import { SaveShortUrl } from '@modules/shortUrls/controllers/saveShortUrl';

describe('Save short url', () => {
	test('Should return 400 when url is not provided', async () => {
		const saveShortUrl = new SaveShortUrl();
		const response = await saveShortUrl.handle({ body: { url: '' } });
		expect(response.status).toBe(400);
	});

	test('Should return an missing params error when url is not provided', async () => {
		const saveShortUrl = new SaveShortUrl();
		const response = await saveShortUrl.handle({ body: { url: '' } });
		expect(response.body).toStrictEqual({
			message: new MissingParams('Url'),
		});
	});
});
