import { Response } from '@shared/response';
import { HttpResponse } from '@shared/httpResponse';
import { IController } from '@shared/interfaces/IController';
import { ISaveUser } from '@modules/identity/application/interface/ISaveUser';
import { IUseCaseFactory } from '@modules/identity/utils/factory/useCase/IUseCaseFactory';
import { RegisterUserInput } from '../dtos/registerUserInput';

type Request = {
	body: {
		name: string;
		email: string;
		password: string;
	};
};

export class RegisterUser implements IController<Request> {
	private readonly saveUser: ISaveUser;

	constructor(factory: IUseCaseFactory) {
		this.saveUser = factory.makeSaveUser();
	}

	public async handle(request: Request): Promise<Response> {
		try {
			const input = RegisterUserInput.safeParse(request.body);
			if (!input.success) {
				return HttpResponse.badRequest(input.error);
			}
			const saveError = await this.saveUser.execute(input.data);
			if (saveError) return HttpResponse.badRequest(saveError);
			return HttpResponse.created({ status: 'success' });
		} catch (error: unknown) {
			return HttpResponse.serverError();
		}
	}
}
