import { IController } from '@shared/interfaces/IController';
import { Response } from '@shared/response';
import { HttpResponse } from '@shared/httpResponse';
import { IGenerateCode } from '@modules/shortenedUrls/application/interface/IGenerateCode';
import { ISaveShortenedUrl } from '@modules/shortenedUrls/application/interface/ISaveShortenedUrl';
import { IUseCaseFactory } from '@modules/shortenedUrls/utils/factory/useCase/IUseCaseFactory';
import { ShortenUrlInput } from '../dtos/shortenUrlInput';
import { ShortenUrlOutput } from '../dtos/shortenUrlOutput';
import { AccessTokenPayload } from '@shared/tokenPayload';
import { ILogger } from '@infra/loggers/ILogger';

type Request = {
	body: {
		url: string;
	};
	user: AccessTokenPayload;
};

export class ShortenUrl implements IController<Request> {
	private readonly logger: ILogger;
	private readonly generateCode: IGenerateCode;
	private readonly saveShortenedUrl: ISaveShortenedUrl;

	constructor(logger: ILogger, factory: IUseCaseFactory) {
		this.logger = logger;
		this.generateCode = factory.makeGenerateCode();
		this.saveShortenedUrl = factory.makeSaveShortenedUrl();
	}

	public async handle(request: Request): Promise<Response> {
		try {
			const ownerId = Number(request.user.id);
			const code = this.generateCode.execute();
			const input = ShortenUrlInput.safeParse({
				...request.body,
				ownerId,
				code,
			});
			if (!input.success) {
				this.logger.error({
					where: 'ShortenUrl.handle(34)',
					what: input.error.message,
				});
				return HttpResponse.badRequest(input.error);
			}
			const saveError = await this.saveShortenedUrl.execute(input.data);
			if (saveError) {
				this.logger.error({
					where: 'ShortenUrl.handle(46)',
					what: saveError.message,
				});
				return HttpResponse.badRequest(saveError);
			}
			const output = ShortenUrlOutput.safeParse({
				code,
			});
			if (!output.success) {
				this.logger.error({
					where: 'ShortenUrl.handle(54)',
					what: output.error.message,
				});
				return HttpResponse.serverError();
			}
			return HttpResponse.created(output.data);
		} catch (error: unknown) {
			this.logger.error({
				where: 'ShortenUrl.handle.catch',
				what: (error as Error).message,
			});
			return HttpResponse.serverError();
		}
	}
}
