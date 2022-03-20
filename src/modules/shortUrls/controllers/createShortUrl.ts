import { MissingParams } from '@helpers/errors/missingParams';
import { Guard } from '@utils/guard';

type Request = {
	body: {
		url: string;
		code: string;
	};
};

type Response = {
	status: number;
	body: object;
};

export class CreateShortUrl {
	public async handle(request: Request): Promise<Response> {
		const result = Guard.againstEmptyOrUndefined([
			{ propName: 'Url', value: request.body.url },
			{ propName: 'Code', value: request.body.code },
		]);
		if (!result.isSuccess) {
			return {
				status: 400,
				body: { message: new MissingParams(`${result.isError}`) },
			};
		}
		return { status: 201, body: { message: 'ok' } };
	}
}
