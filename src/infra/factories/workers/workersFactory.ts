import { IncrementShortenedUrlHitsWorker } from '@infra/workers/bullmq/IncrementShortenedUrlHitsWorker';
import { ShortenedUrlUseCaseFactory } from '../useCases/shortenedUrl';

export class WorkersFactory {
	private readonly shortenedUrlUseCaseFactory: ShortenedUrlUseCaseFactory =
		new ShortenedUrlUseCaseFactory();

	public makeIncrementShortenedUrlHitsWorker(): IncrementShortenedUrlHitsWorker {
		return new IncrementShortenedUrlHitsWorker(
			this.shortenedUrlUseCaseFactory.makeIncrementHit(),
		);
	}
}
