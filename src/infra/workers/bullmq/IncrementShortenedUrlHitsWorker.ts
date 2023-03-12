import { Job } from 'bullmq';

import { IncrementShortenedUrlHitsJob } from '@helpers/jobTypes';
import { IIncrementHit } from '@modules/shortenedUrls/useCases/incrementHit';

export class IncrementShortenedUrlHitsWorker {
	private readonly incrementHit: IIncrementHit;

	constructor(incrementHit: IIncrementHit) {
		this.incrementHit = incrementHit;
	}

	public async execute(
		job: Job<IncrementShortenedUrlHitsJob>,
	): Promise<void> {
		await this.incrementHit.execute(job.data.code);
	}
}
