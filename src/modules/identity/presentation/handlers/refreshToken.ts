import { ICreateAccessToken } from '@modules/identity/application/interface/ICreateAccessToken';
import { IDecodeRefreshToken } from '@modules/identity/application/interface/IDecodeRefreshToken';
import { IFindUserByEmail } from '@modules/identity/application/interface/IFindUserByEmail';
import { IUseCaseFactory } from '@modules/identity/utils/factory/useCase/IUseCaseFactory';
import { HttpResponse } from '@shared/httpResponse';
import { IController } from '@shared/interfaces/IController';
import { Response } from '@shared/response';
import { RefreshTokenInput } from '../dtos/refreshTokenInput';
import { RefreshTokenOutput } from '../dtos/refreshTokenOutput';

type Request = {
	body: {
		refreshToken: string;
	};
};

export class RefreshToken implements IController<Request> {
	private readonly createAccessToken: ICreateAccessToken;
	private readonly decodeRefreshToken: IDecodeRefreshToken;
	private readonly findUserByEmail: IFindUserByEmail;

	constructor(factory: IUseCaseFactory) {
		this.createAccessToken = factory.makeCreateAccessToken();
		this.decodeRefreshToken = factory.makeDecodeRefreshToken();
		this.findUserByEmail = factory.makeFindUserByEmail();
	}

	public async handle(request: Request): Promise<Response> {
		try {
			const input = RefreshTokenInput.safeParse(request.body);
			if (!input.success) {
				return HttpResponse.badRequest(input.error);
			}
			const decodedToken = await this.decodeRefreshToken.execute(
				input.data.refreshToken,
			);
			if (!decodedToken) {
				return HttpResponse.badRequest(
					new Error('Invalid Credentials'),
				);
			}
			const user = await this.findUserByEmail.execute(decodedToken.email);
			if (!user) {
				return HttpResponse.badRequest(
					new Error('Invalid Credentials'),
				);
			}
			if (!user.getActive()) {
				return HttpResponse.badRequest(
					new Error('Invalid Credentials'),
				);
			}
			if (user.getAuthTokenVersion() !== decodedToken.version) {
				return HttpResponse.badRequest(
					new Error('Invalid Credentials'),
				);
			}
			const { accessToken } = await this.createAccessToken.execute(user);
			const output = RefreshTokenOutput.safeParse({ accessToken });
			if (!output.success) return HttpResponse.serverError();
			return HttpResponse.okWithBody(output.data);
		} catch (error: unknown) {
			return HttpResponse.serverError();
		}
	}
}
