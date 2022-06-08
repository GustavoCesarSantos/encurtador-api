import request from 'supertest';

import { ExpressApp } from '@infra/http/express';

const app = new ExpressApp();
app.setupRoutes();

describe('Access root url', () => {
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

	test('Should return status code 201', async () => {
		const { text } = await request(app.getApp())
			.post('/v1/shortenedUrls')
			.send({ url: 'success' });
		const body = JSON.parse(text);
		const code: string = body.url.slice(-5);
		const { status } = await request(app.getApp()).get(
			`/v1/shortenedUrls/${code}`,
		);
		expect(status).toBe(201);
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
