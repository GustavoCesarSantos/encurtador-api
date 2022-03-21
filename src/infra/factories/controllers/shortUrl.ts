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
		return new CreateShortUrl(this.shortUrlUseCaseFactory);
	}
}
