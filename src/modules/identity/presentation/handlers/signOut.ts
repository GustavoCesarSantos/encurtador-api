import { Response } from '@shared/response';
import { HttpResponse } from '@shared/httpResponse';
import { IController } from '@shared/interfaces/IController';
import { IUseCaseFactory } from '@modules/identity/utils/factory/useCase/IUseCaseFactory';
import { AccessTokenPayload } from '@shared/tokenPayload';
import { IIncrementAuthTokenVersion } from '@modules/identity/application/interface/IIncrementAuthTokenVersion';
import { ILogger } from '@infra/loggers/ILogger';

type Request = {
	user: AccessTokenPayload;
};

export class SignOut implements IController<Request> {
	private readonly logger: ILogger;
	private readonly incrementAuthTokenVersion: IIncrementAuthTokenVersion;

	constructor(logger: ILogger, factory: IUseCaseFactory) {
		this.logger = logger;
		this.incrementAuthTokenVersion =
			factory.makeIncrementAuthTokenVersion();
	}

	public async handle(request: Request): Promise<Response> {
		try {
			const userId = Number(request.user.id);
			await this.incrementAuthTokenVersion.execute(userId);
			return HttpResponse.ok();
		} catch (error: unknown) {
			this.logger.error({
				where: 'SignOut.handle.catch',
				what: (error as Error).message,
			});
			return HttpResponse.serverError();
		}
	}
}
