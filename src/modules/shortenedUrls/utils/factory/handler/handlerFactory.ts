import { ShortenUrl } from '@modules/shortenedUrls/presentation/shortenUrl';
import { IUseCaseFactory } from '../useCase/IUseCaseFactory';
import { UseCaseWithPrismaFactory } from '../useCase/useCaseWithPrismaFactory';
import { AccessOriginalUrl } from '@modules/shortenedUrls/presentation/accessOriginalUrl';

export class HandlerFactory {
	private readonly userCase: IUseCaseFactory = new UseCaseWithPrismaFactory();

	public makeAccessOriginalUrl(): AccessOriginalUrl {
		return new AccessOriginalUrl(this.userCase);
	}

	public makeShortenUrl(): ShortenUrl {
		return new ShortenUrl(this.userCase);
	}
}
