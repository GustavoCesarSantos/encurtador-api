import { Job } from 'bullmq';

import { ShortenedUrlCreatedJob } from '@helpers/jobTypes';
import { ISaveShortenedUrl } from '@modules/shortenedUrls/useCases/saveShortenedUrl';

export class ShortenedUrlCreatedWorker {
	private readonly saveShortenedUrl: ISaveShortenedUrl;

	constructor(saveShortenedUrl: ISaveShortenedUrl) {
		this.saveShortenedUrl = saveShortenedUrl;
	}

	async execute(job: Job<ShortenedUrlCreatedJob>): Promise<void> {
		await this.saveShortenedUrl.execute(job.data.url, job.data.code);
	}
}
