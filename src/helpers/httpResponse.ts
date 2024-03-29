import { Response } from '@shared/response';
import { NotFound } from './errors/notFound';

export class HttpResponse {
	static ok(): Response {
		return {
			status: 200,
			body: {},
		};
	}

	static okWithBody(body: object): Response {
		return {
			status: 200,
			body,
		};
	}

	static created(body: object): Response {
		return {
			status: 201,
			body,
		};
	}

	static badRequest(error: Error): Response {
		return {
			status: 400,
			body: {
				message: error.message,
			},
		};
	}

	static notFound(): Response {
		const error = new NotFound();
		return {
			status: 404,
			body: {
				message: error.message,
			},
		};
	}

	static serverError(): Response {
		return {
			status: 500,
			body: {
				message: 'Internal Server Error',
			},
		};
	}
}
