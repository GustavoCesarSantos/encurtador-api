import { AccessOriginalUrl } from '@modules/shortenedUrls/presentation/handlers/accessOriginalUrl';
import { IUseCaseFactory } from '../useCase/IUseCaseFactory';
import { UseCaseWithPrismaFactory } from '../useCase/useCaseWithPrismaFactory';
import { ShortenUrl } from '@modules/shortenedUrls/presentation/handlers/shortenUrl';

export class HandlerFactory {
	private readonly userCase: IUseCaseFactory = new UseCaseWithPrismaFactory();

	public makeAccessOriginalUrl(): AccessOriginalUrl {
		return new AccessOriginalUrl(this.userCase);
	}

	public makeShortenUrl(): ShortenUrl {
		return new ShortenUrl(this.userCase);
	}
}
