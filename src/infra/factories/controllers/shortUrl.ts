import { EventNames } from '@helpers/eventNames';
import { ListenersManager } from '@infra/listeners/eventManager';
import { PinoLogger } from '@infra/listeners/loggers/pinoLogger';
import { AccessRootUrl } from '@modules/shortUrls/controllers/accessRootUrl';
import { CreateShortUrl } from '@modules/shortUrls/controllers/createShortUrl';
import { ShortUrlUseCaseFactory } from '../useCases/shortUrl';

export class ShortUrlControllerFactory {
	private readonly logger = PinoLogger.create();
	private readonly shortUrlUseCaseFactory: ShortUrlUseCaseFactory =
		new ShortUrlUseCaseFactory();

	public makeAccessRootUrl(): AccessRootUrl {
		const manager = new ListenersManager();
		manager.attach(EventNames.info, [this.logger]);
		manager.attach(EventNames.error, [this.logger]);
		return new AccessRootUrl(this.shortUrlUseCaseFactory, manager);
	}

	public makeCreateShortUrl(): CreateShortUrl {
		const manager = new ListenersManager();
		manager.attach(EventNames.info, [this.logger]);
		manager.attach(EventNames.error, [this.logger]);
		return new CreateShortUrl(this.shortUrlUseCaseFactory, manager);
	}
}
