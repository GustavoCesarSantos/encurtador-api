import { Response } from 'shared/response';
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
			status: 201,
			body,
		};
	}

	static redirect(body: object): Response {
		return {
			status: 302,
			body,
		};
	}

	static badRequest(error: object): Response {
		return {
			status: 400,
			body: error,
		};
	}

	static notFound(): Response {
		return {
			status: 404,
			body: { message: new NotFound() },
		};
	}
}
