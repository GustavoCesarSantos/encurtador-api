import { Response } from '@shared/response';
import { HttpResponse } from '@shared/httpResponse';
import { IController } from '@shared/interfaces/IController';
import { IFindShortenedUrl } from '@modules/shortenedUrls/application/interface/IFindShortenedUrl';
import { IUseCaseFactory } from '@modules/shortenedUrls/utils/factory/useCase/IUseCaseFactory';
import { AccessOriginalUrlInput } from '../dtos/accessOriginalUrlInput';
import { AccessOriginalUrlOutput } from '../dtos/accessOriginalUrlOutput';

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
			const input = AccessOriginalUrlInput.safeParse(request.params);
			if (!input.success) {
				return HttpResponse.badRequest(input.error);
			}
			const shortenedUrl = await this.findShortenedUrl.execute(
				input.data.code,
			);
			if (!shortenedUrl) return HttpResponse.notFound();
			const output = AccessOriginalUrlOutput.safeParse({
				originalUrl: shortenedUrl.getOriginalUrl(),
			});
			if (!output.success) return HttpResponse.serverError();
			return HttpResponse.okWithBody(output.data);
		} catch (error: unknown) {
			return HttpResponse.serverError();
		}
	}
}
