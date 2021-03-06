import request from 'supertest';

import { ExpressApp } from '@infra/http/express';

const app = new ExpressApp();
app.setupRoutes();

describe('Create short url', () => {
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
