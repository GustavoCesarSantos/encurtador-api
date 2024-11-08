import { IController } from '@shared/interfaces/IController';
import { Response } from '@shared/response';
import { HttpResponse } from '@shared/httpResponse';
import { IUseCaseFactory } from '@modules/shortenedUrls/utils/factory/useCase/IUseCaseFactory';
import { AccessTokenPayload } from '@shared/tokenPayload';
import { ListAllUserUrlsInput } from '../dtos/listAllUserUrlsInput';
import { ListAllUserUrlsOutput } from '../dtos/listAllUserUrlsOutput';
import { IFindAllShortenedUrls } from '@modules/shortenedUrls/application/interface/IFindAllShortenedUrls';
import { ILogger } from '@infra/loggers/ILogger';

type Request = {
	user: AccessTokenPayload;
};

export class ListAllUserUrls implements IController<Request> {
	private readonly logger: ILogger;
	private readonly findAllShortenedUrls: IFindAllShortenedUrls;

	constructor(logger: ILogger, factory: IUseCaseFactory) {
		this.logger = logger;
		this.findAllShortenedUrls = factory.makeFindAllShortenedUrls();
	}

	public async handle(request: Request): Promise<Response> {
		try {
			const ownerId = Number(request.user.id);
			const input = ListAllUserUrlsInput.safeParse({
				ownerId,
			});
			if (!input.success) {
				this.logger.error({
					where: 'ListAllUserUrls.handle(27)',
					what: input.error.message,
				});
				return HttpResponse.badRequest(input.error);
			}
			const urls = await this.findAllShortenedUrls.execute(
				input.data.ownerId,
			);
			const output = ListAllUserUrlsOutput.safeParse(urls);
			if (!output.success) {
				this.logger.error({
					where: 'ListAllUserUrls.handle(40)',
					what: output.error.message,
				});
				return HttpResponse.serverError();
			}
			return HttpResponse.okWithBody(output.data);
		} catch (error: unknown) {
			this.logger.error({
				where: 'ListAllUserUrls.handle.catch',
				what: (error as Error).message,
			});
			return HttpResponse.serverError();
		}
	}
}
