import { MissingParams } from '@helpers/errors/missingParams';
import { NotFound } from '@helpers/errors/notFound';
import { Guard } from '@utils/guard';
import { IFindShortUrl } from '../useCases/findShortUrl';
import { IIncrementHit } from '../useCases/incrementHit';
import { IUpdateShortUrl } from '../useCases/updateShortUrl';

type PropsConstructor = {
	findShortUrl: IFindShortUrl;
	incrementHit: IIncrementHit;
	updateShortUrl: IUpdateShortUrl;
};

type Request = {
	params: {
		code: string;
	};
};

type Response = {
	status: number;
	body: object;
};

export class AccessRootUrl {
	private readonly findShortUrl: IFindShortUrl;
	private readonly incrementHit: IIncrementHit;
	private readonly updateShortUrl: IUpdateShortUrl;

	constructor(props: PropsConstructor) {
		this.findShortUrl = props.findShortUrl;
		this.incrementHit = props.incrementHit;
		this.updateShortUrl = props.updateShortUrl;
	}

	async handle(request: Request): Promise<Response> {
		const { code } = request.params;
		const result = Guard.againstEmptyOrUndefined([
			{ propName: 'Code', value: code },
		]);
		if (!result.isSuccess) {
			return {
				status: 400,
				body: { message: new MissingParams(`${result.isError}`) },
			};
		}
		const shortUrl = await this.findShortUrl.execute(code);
		if (!shortUrl) {
			return {
				status: 404,
				body: { message: new NotFound() },
			};
		}
		const hits = await this.incrementHit.execute(shortUrl.getHits());
		await this.updateShortUrl.execute(shortUrl.getCode(), { hits });
		return { status: 302, body: { rootUrl: shortUrl.getRootUrl() } };
	}
}
