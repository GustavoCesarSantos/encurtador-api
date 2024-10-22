import { IController } from '@shared/interfaces/IController';
import { IGenerateCode } from '../application/interface/IGenerateCode';
import { Response } from '@shared/response';
import { Guard } from '@utils/guard';
import { HttpResponse } from '@shared/httpResponse';
import { MissingParams } from '@shared/errors/missingParams';
import { IUseCaseFactory } from '../utils/factory/useCase/IUseCaseFactory';
import { ISaveShortenedUrl } from '../application/interface/ISaveShortenedUrl';

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
			const { url } = request.body;
			const validationSchema = [{ propName: 'Url', value: url }];
			const result = Guard.againstEmptyOrUndefined(validationSchema);
			if (!result.isSuccess) {
				return HttpResponse.badRequest(
					new MissingParams(`${result.isError}`),
				);
			}
			const code = this.generateCode.execute();
			const error = await this.saveShortenedUrl.execute(url, code);
			if (error) return HttpResponse.badRequest(error);
			return HttpResponse.created({ code });
		} catch (error: unknown) {
			return HttpResponse.serverError();
		}
	}
}
