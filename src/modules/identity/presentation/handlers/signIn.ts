import { Response } from '@shared/response';
import { HttpResponse } from '@shared/httpResponse';
import { IController } from '@shared/interfaces/IController';
import { IComparePassword } from '@modules/identity/application/interface/IComparePassword';
import { ICreateAccessToken } from '@modules/identity/application/interface/ICreateAccessToken';
import { IFindUserByEmail } from '@modules/identity/application/interface/IFindUserByEmail';
import { IUseCaseFactory } from '@modules/identity/utils/factory/useCase/IUseCaseFactory';
import { SignInInput } from '../dtos/signInInput';
import { SignInOutput } from '../dtos/signInOutput';
import { ICreateRefreshToken } from '@modules/identity/application/interface/ICreateRefreshToken';
import { IIncrementAuthTokenVersion } from '@modules/identity/application/interface/IIncrementAuthTokenVersion';

type Request = {
	body: {
		email: string;
		password: string;
	};
};

export class SignIn implements IController<Request> {
	private readonly comparePassword: IComparePassword;
	private readonly createAccessToken: ICreateAccessToken;
	private readonly createRefreshToken: ICreateRefreshToken;
	private readonly findUserByEmail: IFindUserByEmail;
	private readonly incrementAuthTokenVersion: IIncrementAuthTokenVersion;

	constructor(factory: IUseCaseFactory) {
		this.comparePassword = factory.makeComparePassword();
		this.createAccessToken = factory.makeCreateAccessToken();
		this.createRefreshToken = factory.makeCreateRefreshToken();
		this.findUserByEmail = factory.makeFindUserByEmail();
		this.incrementAuthTokenVersion =
			factory.makeIncrementAuthTokenVersion();
	}

	public async handle(request: Request): Promise<Response> {
		try {
			const input = SignInInput.safeParse(request.body);
			if (!input.success) {
				return HttpResponse.badRequest(input.error);
			}
			const user = await this.findUserByEmail.execute(input.data.email);
			if (!user) {
				return HttpResponse.badRequest(
					new Error('Invalid Credentials'),
				);
			}
			const validPassword = await this.comparePassword.execute(
				input.data.password,
				user.getPassword(),
			);
			if (!validPassword) {
				return HttpResponse.badRequest(
					new Error('Invalid Credentials'),
				);
			}
			const newVersion = await this.incrementAuthTokenVersion.execute(
				user.getId(),
			);
			user.setAuthTokenVersion(newVersion);
			const { accessToken } = await this.createAccessToken.execute(user);
			const { refreshToken } = await this.createRefreshToken.execute(
				user,
			);
			const output = SignInOutput.safeParse({
				accessToken,
				refreshToken,
			});
			if (!output.success) return HttpResponse.serverError();
			return HttpResponse.okWithBody(output.data);
		} catch (error: unknown) {
			return HttpResponse.serverError();
		}
	}
}
