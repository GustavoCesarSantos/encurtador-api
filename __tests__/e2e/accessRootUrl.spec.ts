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

	test('Should return status code 302', async () => {
		const { text } = await request(app.getApp())
			.post('/v1/shortenedUrls')
			.send({ url: 'success' });
		const body = JSON.parse(text);
		const code: string = body.url.split('v1/')[1];
		const { status } = await request(app.getApp()).get(
			`/v1/shortenedUrls/${code}`,
		);
		expect(status).toBe(302);
	});

	test('Should redirect to root url', async () => {
		const { text } = await request(app.getApp())
			.post('/v1/shortenedUrls')
			.send({ url: 'success' });
		const body = JSON.parse(text);
		const code: string = body.url.split('v1/')[1];
		const { redirect } = await request(app.getApp()).get(
			`/v1/shortenedUrls/${code}`,
		);
		expect(redirect).toBe(true);
	});
});
