import { HttpResponse } from '@helpers/httpResponse';
import { ICache } from '@infra/cache/ICache';
import { IMiddleware } from '@shared/IMiddleware';
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
			const record = await this.cache.get(key);
			const window = !process.env.RATE_LIMIT_FIXED_WINDOW_IN_MINUTES
				? 90
				: Number(process.env.RATE_LIMIT_FIXED_WINDOW_IN_MINUTES);
			const limitToken = !process.env.RATE_LIMIT_TOKEN
				? 1000
				: Number(process.env.RATE_LIMIT_TOKEN);
			if (!record) {
				await this.setTokenBucket(key, window, limitToken);
				return HttpResponse.ok();
			}
			const data: tokenBucket = JSON.parse(record);
			const now = new Date();
			if (now.getTime() > data.whenWindowClose.getTime()) {
				await this.setTokenBucket(key, window, limitToken);
				return HttpResponse.ok();
			}
			if (now.getTime() < data.nextTimestampAllowed.getTime()) {
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
			await this.cache.set(key, JSON.stringify(data));
			return HttpResponse.ok();
		} catch (error) {
			return HttpResponse.serverError();
		}
	}

	private getWindowClose(window: number) {
		const now = new Date();
		const whenWindowClose = new Date(now.getTime() + (window + 60 * 1000));
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
}
