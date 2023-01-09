import { AccessRootUrl } from '@modules/shortUrls/controllers/accessRootUrl';
import { BullMQQueue } from '@infra/queues/bullmq/bullmqQueue';
import { CacheWithRedis } from '@infra/cache/cacheWithRedis';
import { CreateShortUrl } from '@modules/shortUrls/controllers/createShortUrl';
import { EventNames } from '@helpers/eventNames';
import { ListenersManager } from '@infra/listeners/eventManager';
import { PinoLogger } from '@infra/listeners/loggers/pinoLogger';
import { ShortUrlUseCaseFactory } from '../useCases/shortUrl';
import { variables } from '@helpers/envs';

export class ShortUrlControllerFactory {
	private readonly cache = new CacheWithRedis();
	private readonly createdQueue = new BullMQQueue(
		variables.shortenedUrlCreatedQueue,
	);
	private readonly logger = PinoLogger.create();
	private readonly manager = new ListenersManager();
	private readonly shortUrlUseCaseFactory: ShortUrlUseCaseFactory =
		new ShortUrlUseCaseFactory();

	constructor() {
		this.manager.attach(EventNames.info, [this.logger]);
		this.manager.attach(EventNames.error, [this.logger]);
	}

	public makeAccessRootUrl(): AccessRootUrl {
		return new AccessRootUrl(
			this.shortUrlUseCaseFactory,
			this.manager,
			this.cache,
		);
	}

	public makeCreateShortUrl(): CreateShortUrl {
		return new CreateShortUrl(
			this.shortUrlUseCaseFactory,
			this.manager,
			this.cache,
			this.createdQueue,
		);
	}
}
