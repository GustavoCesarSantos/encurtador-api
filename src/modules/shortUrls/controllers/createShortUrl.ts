import { MissingParams } from '@helpers/errors/missingParams';
import { Guard } from '@utils/guard';
import { IGenerateCode } from '../useCases/generateCode';
import { IReturnShortUrl } from '../useCases/returnShortUrl';
import { ISaveShortUrl } from '../useCases/saveShortUrl';

type propsConstructor = {
	generateCode: IGenerateCode;
	returnShortUrl: IReturnShortUrl;
	saveShortUrl: ISaveShortUrl;
};

type Request = {
	body: {
		url: string;
	};
};

type Response = {
	status: number;
	body: object;
};

export class CreateShortUrl {
	generateCode: IGenerateCode;
	returnShortUrl: IReturnShortUrl;
	saveShortUrl: ISaveShortUrl;

	constructor(props: propsConstructor) {
		this.generateCode = props.generateCode;
		this.returnShortUrl = props.returnShortUrl;
		this.saveShortUrl = props.saveShortUrl;
	}
	public async handle(request: Request): Promise<Response> {
		const { url } = request.body;
		const result = Guard.againstEmptyOrUndefined([
			{ propName: 'Url', value: url },
		]);
		if (!result.isSuccess) {
			return {
				status: 400,
				body: { message: new MissingParams(`${result.isError}`) },
			};
		}
		const code = this.generateCode.execute();
		const shortUrl = this.returnShortUrl.execute(code);
		await this.saveShortUrl.execute(url, code);
		return { status: 201, body: { url: shortUrl } };
	}
}
