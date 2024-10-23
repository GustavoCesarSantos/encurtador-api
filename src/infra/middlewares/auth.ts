import { variables } from '@shared/envs';
import { HttpResponse } from '@shared/httpResponse';
import { IMiddleware } from '@shared/interfaces/IMiddleware';
import { Response } from '@shared/response';
import { verify } from 'jsonwebtoken';

type Payload = {
	id: number;
	email: string;
};

type Request = {
	headers: {
		authorization: string;
	};
	user: Payload;
};

export class Authenticate implements IMiddleware {
	public async handle(request: Request): Promise<Response> {
		try {
			const authHeader = request.headers.authorization;
			if (!authHeader || !authHeader.startsWith('Bearer ')) {
				return HttpResponse.unauthorized();
			}
			const token = authHeader.split(' ')[1];
			const decodedToken = verify(token, variables.jwtSecret) as Payload;
			if (!decodedToken) {
				return HttpResponse.unauthorized();
			}
			request.user = decodedToken;
			return HttpResponse.ok();
		} catch (error) {
			return HttpResponse.serverError();
		}
	}
}
