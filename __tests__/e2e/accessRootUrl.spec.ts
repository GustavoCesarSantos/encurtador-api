import request from 'supertest';

import { ExpressApp } from '@infra/http/express';
import { RateLimit } from '@infra/middlewares/rate-limit/rateLimit';
import { HttpResponse } from '@helpers/httpResponse';
import { PinoLogger } from '@infra/listeners/loggers/pinoLogger';
import { AccessRootUrl } from '@modules/shortenedUrls/controllers/accessRootUrl';
import { ioRedis } from '@infra/db/redis/ioRedisHelper';

const app = new ExpressApp();
app.setupRoutes();

describe('Access root url', () => {
	beforeAll(() => {
		jest.spyOn(RateLimit.prototype, 'handle').mockImplementation(
			async () => {
				return HttpResponse.ok();
			},
		);
		jest.spyOn(PinoLogger.prototype, 'info').mockImplementation();
		jest.spyOn(PinoLogger.prototype, 'warn').mockImplementation();
		jest.spyOn(PinoLogger.prototype, 'error').mockImplementation();
		jest.spyOn(
			AccessRootUrl.prototype as any,
			'sendToShortenedUrlHitsUpdatedQueue',
		).mockImplementation();
	});

	afterAll(async () => {
		await ioRedis.quit();
	});

	test('Should return status code 404 when schema is not found', async () => {
		jest.spyOn(
			AccessRootUrl.prototype as any,
			'getRootUrl',
		).mockImplementation(async () => {
			return null;
		});
		const { status } = await request(app.getApp()).get(
			'/v1/shortenedUrls/fail',
		);
		expect(status).toBe(404);
	});

	test('Should return not found message when code is not found', async () => {
		jest.spyOn(
			AccessRootUrl.prototype as any,
			'getRootUrl',
		).mockImplementation(async () => {
			return null;
		});
		const { text } = await request(app.getApp()).get(
			'/v1/shortenedUrls/fail',
		);
		const body = JSON.parse(text);
		expect(body.error.message).toBe('Not found');
	});

	test('Should return status code 200', async () => {
		jest.spyOn(
			AccessRootUrl.prototype as any,
			'getRootUrl',
		).mockImplementation(async () => {
			return 'success';
		});
		const { text } = await request(app.getApp())
			.post('/v1/shortenedUrls')
			.send({ url: 'success' });
		const body = JSON.parse(text);
		const code: string = body.url.slice(-5);
		const { status } = await request(app.getApp()).get(
			`/v1/shortenedUrls/${code}`,
		);
		expect(status).toBe(200);
	});

	test('Should return the root url', async () => {
		const rootUrl = 'success';
		jest.spyOn(
			AccessRootUrl.prototype as any,
			'getRootUrl',
		).mockImplementation(async () => {
			return rootUrl;
		});
		const response = await request(app.getApp()).get(
			`/v1/shortenedUrls/12345`,
		);
		const data = JSON.parse(response.text);
		expect(data.rootUrl).toBe(rootUrl);
	});
});
