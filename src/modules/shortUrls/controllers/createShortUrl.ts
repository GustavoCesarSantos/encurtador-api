import { MissingParams } from '@helpers/errors/missingParams';
import { Guard } from '@utils/guard';
import { IController } from '@shared/IController';
import { Response } from '@shared/response';
import { IGenerateCode } from '../useCases/generateCode';
import { IReturnShortUrl } from '../useCases/returnShortUrl';
import { ISaveShortUrl } from '../useCases/saveShortUrl';
import { HttpResponse } from '@helpers/httpResponse';
import { IShortUrlUseCaseFactory } from '@infra/factories/useCases/IShortUrlUseCaseFactory';

type Request = {
	body: {
		url: string;
	};
};

export class CreateShortUrl implements IController<Request> {
	private readonly generateCode: IGenerateCode;
	private readonly returnShortUrl: IReturnShortUrl;
	private readonly saveShortUrl: ISaveShortUrl;

	constructor(factory: IShortUrlUseCaseFactory) {
		this.generateCode = factory.makeGenerateCode();
		this.returnShortUrl = factory.makeReturnShortUrl();
		this.saveShortUrl = factory.makeSaveShortUrl();
	}

	public async handle(request: Request): Promise<Response> {
		const { url } = request.body;
		const result = Guard.againstEmptyOrUndefined([
			{ propName: 'Url', value: url },
		]);
		if (!result.isSuccess) {
			return HttpResponse.badRequest(
				new MissingParams(`${result.isError}`),
			);
		}
		const code = this.generateCode.execute();
		const shortUrl = this.returnShortUrl.execute(code);
		const error = await this.saveShortUrl.execute(url, code);
		if (error) {
			return HttpResponse.badRequest(error);
		}
		return HttpResponse.okWithBody({ url: shortUrl });
	}
}
