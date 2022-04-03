import request from 'supertest';

import { ExpressApp } from '@infra/http/express';

const app = new ExpressApp();
app.setupRoutes();

describe('Create short url', () => {
	test('Should return status code 400 when url is not passed in request body', async () => {
		const response = await request(app.getApp()).post('/v1/').send({});
		expect(response.status).toBe(400);
	});

	test('Should return error message with missing param when url is not passed in request body', async () => {
		const response = await request(app.getApp()).post('/v1/').send({});
		const body = JSON.parse(response.text);
		expect(body.error.message).toBe('Missing params: Url');
	});

	test('Should return status code 201 when valid params are passed', async () => {
		const response = await request(app.getApp())
			.post('/v1/')
			.send({ url: 'success' });
		expect(response.status).toBe(201);
	});

	test('Should return a short url when valid params are passed', async () => {
		const response = await request(app.getApp())
			.post('/v1/')
			.send({ url: 'success' });
		const body = JSON.parse(response.text);
		expect(body).toHaveProperty('url');
	});
});
