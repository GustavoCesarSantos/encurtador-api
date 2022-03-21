import { MissingParams } from '@helpers/errors/missingParams';
import { HttpResponse } from '@helpers/httpResponse';
import { Response } from '@shared/response';
import { Guard } from '@utils/guard';
import { IController } from '@shared/IController';
import { IFindShortUrl } from '../useCases/findShortUrl';
import { IIncrementHit } from '../useCases/incrementHit';
import { IUpdateShortUrl } from '../useCases/updateShortUrl';
import { IShortUrlUseCaseFactory } from '@infra/factories/useCases/IShortUrlUseCaseFactory';

type Request = {
	params: {
		code: string;
	};
};

export class AccessRootUrl implements IController<Request> {
	private readonly findShortUrl: IFindShortUrl;
	private readonly incrementHit: IIncrementHit;
	private readonly updateShortUrl: IUpdateShortUrl;

	constructor(factory: IShortUrlUseCaseFactory) {
		this.findShortUrl = factory.makeFindShortUrl();
		this.incrementHit = factory.makeIncrementHit();
		this.updateShortUrl = factory.makeUpdateShortUrl();
	}

	public async handle(request: Request): Promise<Response> {
		const { code } = request.params;
		const result = Guard.againstEmptyOrUndefined([
			{ propName: 'Code', value: code },
		]);
		if (!result.isSuccess) {
			return HttpResponse.badRequest(
				new MissingParams(`${result.isError}`),
			);
		}
		const shortUrl = await this.findShortUrl.execute(code);
		if (!shortUrl) {
			return HttpResponse.notFound();
		}
		const hits = await this.incrementHit.execute(shortUrl.getHits());
		await this.updateShortUrl.execute(shortUrl.getCode(), { hits });
		return HttpResponse.redirect({ rootUrl: shortUrl.getRootUrl() });
	}
}
