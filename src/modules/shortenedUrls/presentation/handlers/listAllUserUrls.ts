import { IController } from '@shared/interfaces/IController';
import { Response } from '@shared/response';
import { HttpResponse } from '@shared/httpResponse';
import { IUseCaseFactory } from '@modules/shortenedUrls/utils/factory/useCase/IUseCaseFactory';
import { AccessTokenPayload } from '@shared/tokenPayload';
import { ListAllUserUrlsInput } from '../dtos/listAllUserUrlsInput';
import { ListAllUserUrlsOutput } from '../dtos/listAllUserUrlsOutput';
import { IFindAllShortenedUrls } from '@modules/shortenedUrls/application/interface/IFindAllShortenedUrls';

type Request = {
	user: AccessTokenPayload;
};

export class ListAllUserUrls implements IController<Request> {
	private readonly findAllShortenedUrls: IFindAllShortenedUrls;

	constructor(factory: IUseCaseFactory) {
		this.findAllShortenedUrls = factory.makeFindAllShortenedUrls();
	}

	public async handle(request: Request): Promise<Response> {
		try {
			const ownerId = Number(request.user.id);
			const input = ListAllUserUrlsInput.safeParse({
				ownerId,
			});
			if (!input.success) {
				return HttpResponse.badRequest(input.error);
			}
			const urls = await this.findAllShortenedUrls.execute(
				input.data.ownerId,
			);
			const output = ListAllUserUrlsOutput.safeParse({
				urls,
			});
			if (!output.success) return HttpResponse.serverError();
			return HttpResponse.okWithBody(output.data);
		} catch (error: unknown) {
			return HttpResponse.serverError();
		}
	}
}
