import { Job } from 'bullmq';

import { ShortenedUrlCreatedJob } from '@helpers/jobTypes';
import { ISaveShortenedUrl } from '@modules/shortenedUrls/useCases/saveShortenedUrl';
import { ICache } from '@infra/cache/ICache';

export class ShortenedUrlCreatedWorker {
	private readonly cache: ICache;
	private readonly saveShortenedUrl: ISaveShortenedUrl;

	constructor(cache: ICache, saveShortenedUrl: ISaveShortenedUrl) {
		this.cache = cache;
		this.saveShortenedUrl = saveShortenedUrl;
	}

	public async execute(job: Job<ShortenedUrlCreatedJob>): Promise<void> {
		await this.saveShortenedUrl.execute(job.data.url, job.data.code);
		await this.deleteLongTermCache(job.data.code);
		await this.createShortTermCache(job.data.code, job.data.url);
	}

	private async deleteLongTermCache(code: string): Promise<void> {
		await this.cache.del(`${code}:longTerm`);
	}

	private async createShortTermCache(
		code: string,
		url: string,
	): Promise<void> {
		await this.cache.set(`${code}:shortTerm`, url);
	}
}
