import { IRepository } from '@modules/identity/external/db/IRepository';
import { variables } from '@shared/envs';
import { HttpResponse } from '@shared/httpResponse';
import { IMiddleware } from '@shared/interfaces/IMiddleware';
import { Response } from '@shared/response';
import { AccessTokenPayload } from '@shared/tokenPayload';
import { verify } from 'jsonwebtoken';

type Request = {
	headers: {
		authorization: string;
	};
	user: AccessTokenPayload;
};

export class Authenticate implements IMiddleware {
	private readonly repository: IRepository;

	constructor(repository: IRepository) {
		this.repository = repository;
	}

	public async handle(request: Request): Promise<Response> {
		try {
			const authHeader = request.headers.authorization;
			if (!authHeader || !authHeader.startsWith('Bearer ')) {
				return HttpResponse.unauthorized();
			}
			const token = authHeader.split(' ')[1];
			const decodedToken = verify(
				token,
				variables.accessTokenSecret,
			) as AccessTokenPayload;
			if (!decodedToken) {
				return HttpResponse.unauthorized();
			}
			const user = await this.repository.findById(decodedToken.id);
			if (!user) return HttpResponse.unauthorized();
			if (!user.getActive()) return HttpResponse.unauthorized();
			if (user.getAuthTokenVersion() !== decodedToken.version) {
				return HttpResponse.unauthorized();
			}
			request.user = decodedToken;
			return HttpResponse.ok();
		} catch (error) {
			return HttpResponse.unauthorized();
		}
	}
}
