import { MissingParams } from '@helpers/errors/missingParams';
import { AccessRootUrl } from '@modules/shortUrls/controllers/accessRootUrl';

describe('Access root url', () => {
	test('Should return 400 when code is not provided', async () => {
		const accessRootUrl = new AccessRootUrl();
		const response = await accessRootUrl.handle({ params: { code: '' } });
		expect(response.status).toBe(400);
	});

	test('Should return a missing params error when code is not provided', async () => {
		const accessRootUrl = new AccessRootUrl();
		const response = await accessRootUrl.handle({ params: { code: '' } });
		expect(response.body).toStrictEqual({
			message: new MissingParams('Code'),
		});
	});
});
