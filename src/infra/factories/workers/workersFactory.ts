import { ShortenedUrlCreatedWorker } from '@infra/workers/bullmq/ShortenedUrlCreatedWorker';
import { ShortenedUrlUseCaseFactory } from '../useCases/shortenedUrl';

export class WorkersFactory {
	private readonly shortenedUrlUseCaseFactory: ShortenedUrlUseCaseFactory =
		new ShortenedUrlUseCaseFactory();

	public makeShortenedUrlCreatedWorker(): ShortenedUrlCreatedWorker {
		return new ShortenedUrlCreatedWorker(
			this.shortenedUrlUseCaseFactory.makesaveShortenedUrl(),
		);
	}
}
