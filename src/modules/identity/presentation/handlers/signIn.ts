import { Response } from '@shared/response';
import { HttpResponse } from '@shared/httpResponse';
import { IController } from '@shared/interfaces/IController';
import { IComparePassword } from '@modules/identity/application/interface/IComparePassword';
import { ICreateAccessToken } from '@modules/identity/application/interface/ICreateAccessToken';
import { IFindUserByEmail } from '@modules/identity/application/interface/IFindUserByEmail';
import { IUseCaseFactory } from '@modules/identity/utils/factory/useCase/IUseCaseFactory';
import { SignInInput } from '../dtos/signInInput';

type Request = {
	body: {
		email: string;
		password: string;
	};
};

export class SignIn implements IController<Request> {
	private readonly comparePassword: IComparePassword;
	private readonly createAccessToken: ICreateAccessToken;
	private readonly findUserByEmail: IFindUserByEmail;

	constructor(factory: IUseCaseFactory) {
		this.comparePassword = factory.makeComparePassword();
		this.createAccessToken = factory.makeCreateAccessToken();
		this.findUserByEmail = factory.makeFindUserByEmail();
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
			const result = await this.createAccessToken.execute(user);
			return HttpResponse.okWithBody({ ...result });
		} catch (error: unknown) {
			return HttpResponse.serverError();
		}
	}
}
