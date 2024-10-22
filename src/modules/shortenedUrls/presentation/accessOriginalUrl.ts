import { Guard } from '@utils/guard';
import { MissingParams } from '@shared/errors/missingParams';
import { Response } from '@shared/response';
import { HttpResponse } from '@shared/httpResponse';
import { IController } from '@shared/interfaces/IController';
import { IUseCaseFactory } from '../utils/factory/useCase/IUseCaseFactory';
import { IFindShortenedUrl } from '../application/interface/IFindShortenedUrl';

type Request = {
	params: {
		code: string;
	};
};

export class AccessOriginalUrl implements IController<Request> {
	private readonly findShortenedUrl: IFindShortenedUrl;

	constructor(factory: IUseCaseFactory) {
		this.findShortenedUrl = factory.makeFindShortenedUrl();
	}

	public async handle(request: Request): Promise<Response> {
		try {
			const { code } = request.params;
			const validationSchema = [{ propName: 'Code', value: code }];
			const result = Guard.againstEmptyOrUndefined(validationSchema);
			if (!result.isSuccess) {
				return HttpResponse.badRequest(
					new MissingParams(`${result.isError}`),
				);
			}
			const shortenedUrl = await this.findShortenedUrl.execute(code);
			if (!shortenedUrl) return HttpResponse.notFound();
			return HttpResponse.okWithBody({
				originalUrl: shortenedUrl.getOriginalUrl(),
			});
		} catch (error: unknown) {
			return HttpResponse.serverError();
		}
	}
}
