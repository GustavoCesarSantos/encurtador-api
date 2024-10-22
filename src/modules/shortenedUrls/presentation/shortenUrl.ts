import { IController } from '@shared/interfaces/IController';
import { IGenerateCode } from '../application/interface/IGenerateCode';
import { Response } from '@shared/response';
import { HttpResponse } from '@shared/httpResponse';
import { IUseCaseFactory } from '../utils/factory/useCase/IUseCaseFactory';
import { ISaveShortenedUrl } from '../application/interface/ISaveShortenedUrl';
import { ShortenUrlInput } from './dtos/shortenUrlInput';
import { ShortenUrlOutput } from './dtos/shortenUrlOutput';

type Request = {
	body: {
		url: string;
	};
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
			const ownerId = 1;
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
