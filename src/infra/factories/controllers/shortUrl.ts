import { EventNames } from '@helpers/eventNames';
import { ListenersManager } from '@infra/listeners/eventManager';
import { PinoLogger } from '@infra/listeners/loggers/pinoLogger';
import { AccessRootUrl } from '@modules/shortUrls/controllers/accessRootUrl';
import { CreateShortUrl } from '@modules/shortUrls/controllers/createShortUrl';
import { ShortUrlUseCaseFactory } from '../useCases/shortUrl';

export class ShortUrlControllerFactory {
	private readonly manager = new ListenersManager();
	private readonly logger = PinoLogger.create();
	private readonly shortUrlUseCaseFactory: ShortUrlUseCaseFactory =
		new ShortUrlUseCaseFactory();

	constructor() {
		this.manager.attach(EventNames.info, [this.logger]);
		this.manager.attach(EventNames.error, [this.logger]);
	}

	public makeAccessRootUrl(): AccessRootUrl {
		return new AccessRootUrl(this.shortUrlUseCaseFactory, this.manager);
	}

	public makeCreateShortUrl(): CreateShortUrl {
		return new CreateShortUrl(this.shortUrlUseCaseFactory, this.manager);
	}
}
