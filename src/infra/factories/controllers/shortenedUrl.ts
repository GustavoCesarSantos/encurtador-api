import { AccessRootUrl } from '@modules/shortenedUrls/controllers/accessRootUrl';
import { BullMQQueue } from '@infra/queues/bullmq/bullmqQueue';
import { CacheWithRedis } from '@infra/cache/cacheWithRedis';
import { CreateShortenedUrl } from '@modules/shortenedUrls/controllers/createShortenedUrl';
import { EventNames } from '@helpers/eventNames';
import { ListenersManager } from '@infra/listeners/eventManager';
import { PinoLogger } from '@infra/listeners/loggers/pinoLogger';
import { ShortenedUrlUseCaseFactory } from '../useCases/shortenedUrl';
import { QueueName } from '@helpers/queue';

export class ShortenedUrlControllerFactory {
	private readonly cache = new CacheWithRedis();
	private readonly logger = PinoLogger.create();
	private readonly manager = new ListenersManager();
	private readonly updatedQueue = new BullMQQueue(
		QueueName.ShortenedUrlHitsUpdated,
	);
	private readonly shortenedUrlUseCaseFactory: ShortenedUrlUseCaseFactory =
		new ShortenedUrlUseCaseFactory();

	constructor() {
		this.manager.attach(EventNames.info, [this.logger]);
		this.manager.attach(EventNames.warn, [this.logger]);
		this.manager.attach(EventNames.error, [this.logger]);
	}

	public makeAccessRootUrl(): AccessRootUrl {
		return new AccessRootUrl(
			this.shortenedUrlUseCaseFactory,
			this.manager,
			this.cache,
			this.updatedQueue,
		);
	}

	public makeCreateShortenedUrl(): CreateShortenedUrl {
		return new CreateShortenedUrl(
			this.shortenedUrlUseCaseFactory,
			this.manager,
			this.cache,
		);
	}
}
