import { EventNames } from '@helpers/eventNames';
import { ListenersManager } from '@infra/listeners/eventManager';
import { PinoLogger } from '@infra/listeners/loggers/pinoLogger';
import { AccessRootUrl } from '@modules/shortUrls/controllers/accessRootUrl';
import { CreateShortUrl } from '@modules/shortUrls/controllers/createShortUrl';
import { ShortUrlUseCaseFactory } from '../useCases/shortUrl';

export class ShortUrlControllerFactory {
	private readonly shortUrlUseCaseFactory: ShortUrlUseCaseFactory =
		new ShortUrlUseCaseFactory();

	public makeAccessRootUrl(): AccessRootUrl {
		return new AccessRootUrl(this.shortUrlUseCaseFactory);
	}

	public makeCreateShortUrl(): CreateShortUrl {
		const logger = PinoLogger.create();
		const manager = new ListenersManager();
		manager.attach(EventNames.info, [logger]);
		return new CreateShortUrl(this.shortUrlUseCaseFactory, manager);
	}
}
