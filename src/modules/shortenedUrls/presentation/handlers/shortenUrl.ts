import { IController } from '@shared/interfaces/IController';
import { Response } from '@shared/response';
import { HttpResponse } from '@shared/httpResponse';
import { IGenerateCode } from '@modules/shortenedUrls/application/interface/IGenerateCode';
import { ISaveShortenedUrl } from '@modules/shortenedUrls/application/interface/ISaveShortenedUrl';
import { IUseCaseFactory } from '@modules/shortenedUrls/utils/factory/useCase/IUseCaseFactory';
import { ShortenUrlInput } from '../dtos/shortenUrlInput';
import { ShortenUrlOutput } from '../dtos/shortenUrlOutput';
import { AccessTokenPayload } from '@shared/tokenPayload';

type Request = {
	body: {
		url: string;
	};
	user: AccessTokenPayload;
};

export class ShortenUrl implements IController<Request> {
	private readonly generateCode: IGenerateCode;
	private readonly saveShortenedUrl: ISaveShortenedUrl;

	constructor(factory: IUseCaseFactory) {
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
				return HttpResponse.badRequest(input.error);
			}
			const saveError = await this.saveShortenedUrl.execute(input.data);
			if (saveError) return HttpResponse.badRequest(saveError);
			const output = ShortenUrlOutput.safeParse({
				code,
			});
			if (!output.success) return HttpResponse.serverError();
			return HttpResponse.created(output.data);
		} catch (error: unknown) {
			return HttpResponse.serverError();
		}
	}
}
