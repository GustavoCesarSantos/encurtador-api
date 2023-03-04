import request from 'supertest';

import { ExpressApp } from '@infra/http/express';
import { RateLimit } from '@infra/middlewares/rate-limit/rateLimit';
import { HttpResponse } from '@helpers/httpResponse';
import { PinoLogger } from '@infra/listeners/loggers/pinoLogger';

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
	});

	test('Should return status code 404 when schema is not found', async () => {
		const { status } = await request(app.getApp()).get(
			'/v1/shortenedUrls/fail',
		);
		expect(status).toBe(404);
	});

	test('Should return not found message when code is not found', async () => {
		const { text } = await request(app.getApp()).get(
			'/v1/shortenedUrls/fail',
		);
		const body = JSON.parse(text);
		expect(body.error.message).toBe('Not found');
	});

	test('Should return status code 200', async () => {
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
		const { text } = await request(app.getApp())
			.post('/v1/shortenedUrls')
			.send({ url: 'success' });
		const body = JSON.parse(text);
		const code: string = body.url.slice(-5);
		const response = await request(app.getApp()).get(
			`/v1/shortenedUrls/${code}`,
		);
		const body2 = JSON.parse(response.text);
		expect(body2.rootUrl).toBe('success');
	});
});
