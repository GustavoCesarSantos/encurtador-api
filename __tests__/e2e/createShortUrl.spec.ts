import request from 'supertest';

import { ExpressApp } from '@infra/http/express';
import { RateLimit } from '@infra/middlewares/rate-limit/rateLimit';
import { PinoLogger } from '@infra/listeners/loggers/pinoLogger';
import { HttpResponse } from '@helpers/httpResponse';
import { CreateShortenedUrl } from '@modules/shortenedUrls/controllers/createShortenedUrl';

const app = new ExpressApp();
app.setupRoutes();

describe('Create short url', () => {
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
			CreateShortenedUrl.prototype as any,
			'sendToShortenedUrlCreationQueue',
		).mockImplementation();
	});

	test('Should return status code 400 when url is not passed in request body', async () => {
		const { status } = await request(app.getApp())
			.post('/v1/shortenedUrls')
			.send({});
		expect(status).toBe(400);
	});

	test('Should return error message with missing param when url is not passed in request body', async () => {
		const { text } = await request(app.getApp())
			.post('/v1/shortenedUrls')
			.send({});
		const body = JSON.parse(text);
		expect(body.error.message).toBe('Missing params: Url');
	});

	test('Should return status code 201 when valid params are passed', async () => {
		const { status } = await request(app.getApp())
			.post('/v1/shortenedUrls')
			.send({ url: 'success' });
		expect(status).toBe(201);
	});

	test('Should return a short url when valid params are passed', async () => {
		const { text } = await request(app.getApp())
			.post('/v1/shortenedUrls')
			.send({ url: 'success' });
		const body = JSON.parse(text);
		expect(body).toHaveProperty('url');
	});
});
