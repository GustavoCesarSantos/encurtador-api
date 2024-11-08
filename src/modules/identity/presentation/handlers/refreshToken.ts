import { ICreateAccessToken } from '@modules/identity/application/interface/ICreateAccessToken';
import { IDecodeRefreshToken } from '@modules/identity/application/interface/IDecodeRefreshToken';
import { IFindUserByEmail } from '@modules/identity/application/interface/IFindUserByEmail';
import { IUseCaseFactory } from '@modules/identity/utils/factory/useCase/IUseCaseFactory';
import { HttpResponse } from '@shared/httpResponse';
import { IController } from '@shared/interfaces/IController';
import { Response } from '@shared/response';
import { RefreshTokenInput } from '../dtos/refreshTokenInput';
import { RefreshTokenOutput } from '../dtos/refreshTokenOutput';
import { ILogger } from '@infra/loggers/ILogger';

type Request = {
	body: {
		refreshToken: string;
	};
};

export class RefreshToken implements IController<Request> {
	private readonly logger: ILogger;
	private readonly createAccessToken: ICreateAccessToken;
	private readonly decodeRefreshToken: IDecodeRefreshToken;
	private readonly findUserByEmail: IFindUserByEmail;

	constructor(logger: ILogger, factory: IUseCaseFactory) {
		this.logger = logger;
		this.createAccessToken = factory.makeCreateAccessToken();
		this.decodeRefreshToken = factory.makeDecodeRefreshToken();
		this.findUserByEmail = factory.makeFindUserByEmail();
	}

	public async handle(request: Request): Promise<Response> {
		try {
			const input = RefreshTokenInput.safeParse(request.body);
			if (!input.success) {
				this.logger.error({
					where: 'RefreshToken.handle(33)',
					what: input.error.message,
				});
				return HttpResponse.badRequest(input.error);
			}
			const decodedToken = await this.decodeRefreshToken.execute(
				input.data.refreshToken,
			);
			if (!decodedToken) {
				this.logger.error({
					where: 'RefreshToken.handle(41)',
					what: 'Invalid refresh token',
				});
				return HttpResponse.badRequest(
					new Error('Invalid Credentials'),
				);
			}
			const user = await this.findUserByEmail.execute(decodedToken.email);
			if (!user) {
				this.logger.error({
					where: 'RefreshToken.handle(53)',
					what: `User not found using: ${decodedToken.email}`,
				});
				return HttpResponse.badRequest(
					new Error('Invalid Credentials'),
				);
			}
			if (!user.getActive()) {
				this.logger.error({
					where: 'RefreshToken.handle(63)',
					what: `Inactive User. Email: ${decodedToken.email}`,
				});
				return HttpResponse.badRequest(
					new Error('Invalid Credentials'),
				);
			}
			if (user.getAuthTokenVersion() !== decodedToken.version) {
				this.logger.error({
					where: 'RefreshToken.handle(72)',
					what: `Invalid auth token`,
				});
				return HttpResponse.badRequest(
					new Error('Invalid Credentials'),
				);
			}
			const { accessToken } = await this.createAccessToken.execute(user);
			const output = RefreshTokenOutput.safeParse({ accessToken });
			if (!output.success) {
				this.logger.error({
					where: 'RefreshToken.handle(82)',
					what: output.error.message,
				});
				return HttpResponse.serverError();
			}
			return HttpResponse.okWithBody(output.data);
		} catch (error: unknown) {
			this.logger.error({
				where: 'RefreshToken.handle.catch',
				what: (error as Error).message,
			});
			return HttpResponse.serverError();
		}
	}
}
