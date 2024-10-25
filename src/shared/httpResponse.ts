import { Response } from '@shared/response';
import { NotFound } from './errors/notFound';

export class HttpResponse {
	static badRequest(error: Error): Response {
		return {
			status: 400,
			body: {
				message: error.message,
			},
		};
	}

	static created(body: object): Response {
		return {
			status: 201,
			body,
		};
	}

	static notFound(resource?: string): Response {
		const error = new NotFound();
		return {
			status: 404,
			body: {
				message: error.message,
				resource,
			},
		};
	}

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

	static toManyRequests(): Response {
		return {
			status: 429,
			body: {
				message: 'Too Many Requests',
			},
		};
	}

	static unauthorized(): Response {
		return {
			status: 401,
			body: {
				message: 'Unauthorized',
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
