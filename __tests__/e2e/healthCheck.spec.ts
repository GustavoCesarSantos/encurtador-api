import request from 'supertest';

import { ExpressApp } from '@infra/http/express';
import { RateLimit } from '@infra/middlewares/rate-limit/rateLimit';
import { HttpResponse } from '@helpers/httpResponse';
import { PinoLogger } from '@infra/listeners/loggers/pinoLogger';
import { ioRedis } from '@infra/db/redis/ioRedisHelper';

const app = new ExpressApp();
app.setupRoutes();

describe('Health Check url', () => {
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

	afterAll(async () => {
		await ioRedis.quit();
	});

	test('Should return status code 200 when server is running', async () => {
		const { status } = await request(app.getApp()).get('/v1/health');
		expect(status).toBe(200);
	});

	test('Should return status ok when server is running', async () => {
		const { text } = await request(app.getApp()).get('/v1/health');
		const response = JSON.parse(text);
		expect(response.message).toBe('ok');
	});
});
