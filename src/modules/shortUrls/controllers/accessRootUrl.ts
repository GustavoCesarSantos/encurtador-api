import { MissingParams } from '@helpers/errors/missingParams';
import { Guard } from '@utils/guard';

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
		return { status: 200, body: { message: 'Success' } };
	}
}
