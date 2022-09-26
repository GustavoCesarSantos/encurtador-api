import { HttpResponse } from '@helpers/httpResponse';
import { ICache } from '@infra/cache/ICache';
import { IMiddleware } from '@shared/IMiddleware';
import { Response } from '@shared/response';

type Request = {
	ip: string;
};

export class RateLimit implements IMiddleware {
	private readonly cache: ICache;

	constructor(cache: ICache) {
		this.cache = cache;
	}

	public async handle(request: Request): Promise<Response> {
		try {
			const key = request.ip;
			const record = await this.cache.get(key);
			if (!record) {
				const value = JSON.stringify({
					timestamp: new Date(),
					token: 100,
				});
				await this.cache.set(key, value);
				return HttpResponse.ok();
			}
			const data: { timestamp: Date; token: number } = JSON.parse(record);
			data.token--;
			await this.cache.set(key, JSON.stringify(data));
			return HttpResponse.ok();
		} catch (error) {
			return HttpResponse.serverError();
		}
	}
}
