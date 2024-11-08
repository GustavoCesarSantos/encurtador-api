import { Response } from '@shared/response';
import { HttpResponse } from '@shared/httpResponse';
import { IController } from '@shared/interfaces/IController';
import { ISaveUser } from '@modules/identity/application/interface/ISaveUser';
import { IUseCaseFactory } from '@modules/identity/utils/factory/useCase/IUseCaseFactory';
import { RegisterUserInput } from '../dtos/registerUserInput';
import { ILogger } from '@infra/loggers/ILogger';

type Request = {
	body: {
		name: string;
		email: string;
		password: string;
	};
};

export class RegisterUser implements IController<Request> {
	private readonly logger: ILogger;
	private readonly saveUser: ISaveUser;

	constructor(logger: ILogger, factory: IUseCaseFactory) {
		this.logger = logger;
		this.saveUser = factory.makeSaveUser();
	}

	public async handle(request: Request): Promise<Response> {
		try {
			const input = RegisterUserInput.safeParse(request.body);
			if (!input.success) {
				this.logger.error({
					where: 'RegisterUser.handle(28)',
					what: input.error.message,
				});
				return HttpResponse.badRequest(input.error);
			}
			const saveError = await this.saveUser.execute(input.data);
			if (saveError) {
				this.logger.error({
					where: 'RegisterUser.handle(36)',
					what: saveError.message,
				});
				return HttpResponse.badRequest(saveError);
			}
			return HttpResponse.created({ status: 'success' });
		} catch (error: unknown) {
			this.logger.error({
				where: 'RegisterUser.handle.catch',
				what: (error as Error).message,
			});
			return HttpResponse.serverError();
		}
	}
}
