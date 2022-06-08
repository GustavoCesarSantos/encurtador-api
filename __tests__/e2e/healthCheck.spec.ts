import request from 'supertest';

import { ExpressApp } from '@infra/http/express';

const app = new ExpressApp();
app.setupRoutes();

describe('Health Check url', () => {
	test('Should return status code 200 when server is running', async () => {
		const { status } = await request(app.getApp()).get('/v1/healthCheck');
		expect(status).toBe(200);
	});

	test('Should return status ok when server is running', async () => {
		const { text } = await request(app.getApp()).get('/v1/healthCheck');
		const response = JSON.parse(text);
		expect(response.healthCheck).toBe('ok');
	});
});
