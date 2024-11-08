import { AccessOriginalUrl } from '@modules/shortenedUrls/presentation/handlers/accessOriginalUrl';
import { IUseCaseFactory } from '../useCase/IUseCaseFactory';
import { UseCaseWithPrismaFactory } from '../useCase/useCaseWithPrismaFactory';
import { ShortenUrl } from '@modules/shortenedUrls/presentation/handlers/shortenUrl';
import { ListAllUserUrls } from '@modules/shortenedUrls/presentation/handlers/listAllUserUrls';
import { ILogger } from '@infra/loggers/ILogger';
import { PinoLogger } from '@infra/loggers/pinoLogger';

export class HandlerFactory {
	private readonly logger: ILogger = PinoLogger.create();
	private readonly userCase: IUseCaseFactory = new UseCaseWithPrismaFactory();

	public makeAccessOriginalUrl(): AccessOriginalUrl {
		return new AccessOriginalUrl(this.logger, this.userCase);
	}

	public makeListAllUserUrls(): ListAllUserUrls {
		return new ListAllUserUrls(this.logger, this.userCase);
	}

	public makeShortenUrl(): ShortenUrl {
		return new ShortenUrl(this.logger, this.userCase);
	}
}
