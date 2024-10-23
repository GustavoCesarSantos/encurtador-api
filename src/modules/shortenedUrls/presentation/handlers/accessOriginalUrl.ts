import { Response } from '@shared/response';
import { HttpResponse } from '@shared/httpResponse';
import { IController } from '@shared/interfaces/IController';
import { IFindShortenedUrl } from '@modules/shortenedUrls/application/interface/IFindShortenedUrl';
import { IUseCaseFactory } from '@modules/shortenedUrls/utils/factory/useCase/IUseCaseFactory';
import { AccessOriginalUrlInput } from '../dtos/accessOriginalUrlInput';
import { AccessOriginalUrlOutput } from '../dtos/accessOriginalUrlOutput';
import { IIncrementAccessCounter } from '@modules/shortenedUrls/application/interface/IIncrementAccessCounter';

type Request = {
	params: {
		code: string;
	};
};

export class AccessOriginalUrl implements IController<Request> {
	private readonly findShortenedUrl: IFindShortenedUrl;
	private readonly incrementAccessCounter: IIncrementAccessCounter;

	constructor(factory: IUseCaseFactory) {
		this.findShortenedUrl = factory.makeFindShortenedUrl();
		this.incrementAccessCounter = factory.makeIncrementAccessCounter();
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
			await this.incrementAccessCounter.execute(input.data.code);
			return HttpResponse.okWithBody(output.data);
		} catch (error: unknown) {
			return HttpResponse.serverError();
		}
	}
}
