import { ICache } from '@infra/cache/ICache';
import { variables } from '@shared/envs';
import { HttpResponse } from '@shared/httpResponse';
import { IMiddleware } from '@shared/interfaces/IMiddleware';
import { Response } from '@shared/response';

type Request = {
	ip: string;
};

type tokenBucket = {
	whenWindowClose: Date;
	nextTimestampAllowed: Date;
	token: number;
};

export class RateLimit implements IMiddleware {
	private readonly cache: ICache;

	constructor(cache: ICache) {
		this.cache = cache;
	}

	public async handle(request: Request): Promise<Response> {
		try {
			const key = request.ip;
			if (!key) return HttpResponse.serverError();
			const record = await this.cache.get(key);
			const window = variables.rateLimitFixedWindowInMinutes;
			const limitToken = variables.rateLimitToken;
			if (!record) {
				await this.setTokenBucket(key, window, limitToken);
				return HttpResponse.ok();
			}
			const data: tokenBucket = JSON.parse(record);
			const now = new Date();
			if (now > new Date(data.whenWindowClose)) {
				await this.setTokenBucket(key, window, limitToken);
				return HttpResponse.ok();
			}
			if (now < new Date(data.nextTimestampAllowed)) {
				return HttpResponse.badRequest(new Error('Request Denied'));
			}
			if (data.token < 0) {
				return HttpResponse.badRequest(new Error('Request Denied'));
			}
			data.token--;
			data.nextTimestampAllowed = this.getNextRequestTimestampAllowed(
				window,
				limitToken,
			);
			await this.updateTokenBucket(key, data);
			return HttpResponse.ok();
		} catch (error) {
			return HttpResponse.serverError();
		}
	}

	private async setTokenBucket(
		key: string,
		window: number,
		limitToken: number,
	) {
		const value = JSON.stringify({
			whenWindowClose: this.getWindowClose(Number(window)),
			nextTimestampAllowed: this.getNextRequestTimestampAllowed(
				Number(window),
				Number(limitToken),
			),
			token: Number(process.env.RATE_LIMIT_TOKEN),
		});
		await this.cache.set(key, value);
	}

	private async updateTokenBucket(key: string, tokenBucket: tokenBucket) {
		await this.cache.set(key, JSON.stringify(tokenBucket));
	}

	private getWindowClose(window: number) {
		const now = new Date();
		const minutes = 60 * 1000;
		const whenWindowClose = new Date(now.getTime() + window * minutes);
		return whenWindowClose;
	}

	private getNextRequestTimestampAllowed(
		window: number,
		limitToken: number,
	): Date {
		const nextTimestamp = new Date();
		const seconds = (window * 60) / limitToken;
		nextTimestamp.setSeconds(nextTimestamp.getSeconds() + seconds);
		return nextTimestamp;
	}
}
