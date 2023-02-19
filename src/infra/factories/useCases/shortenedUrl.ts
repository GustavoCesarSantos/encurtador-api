import { EventNames } from '@helpers/eventNames';
import { ShortenedUrlRepositoryWithPrisma } from '@infra/db/prisma/shortenedUrlRepositoryWithPrisma';
import { ListenersManager } from '@infra/listeners/eventManager';
import { PinoLogger } from '@infra/listeners/loggers/pinoLogger';
import { FindShortenedUrl } from '@modules/shortenedUrls/useCases/findShortenedUrl';
import { GenerateCode } from '@modules/shortenedUrls/useCases/generateCode';
import { IncrementHit } from '@modules/shortenedUrls/useCases/incrementHit';
import { ReturnShortenedUrl } from '@modules/shortenedUrls/useCases/returnShortenedUrl';
import { SaveShortenedUrl } from '@modules/shortenedUrls/useCases/saveShortenedUrl';
import { UpdateShortenedUrl } from '@modules/shortenedUrls/useCases/updateShortenedUrl';
import { IShortenedUrlUseCaseFactory } from './IShortenedUrlUseCaseFactory';

export class ShortenedUrlUseCaseFactory implements IShortenedUrlUseCaseFactory {
	private readonly manager = new ListenersManager();
	private readonly logger = PinoLogger.create();
	private readonly shortUrlRepository: ShortenedUrlRepositoryWithPrisma =
		new ShortenedUrlRepositoryWithPrisma();

	constructor() {
		this.manager.attach(EventNames.info, [this.logger]);
		this.manager.attach(EventNames.warn, [this.logger]);
		this.manager.attach(EventNames.error, [this.logger]);
	}

	public makeIncrementHit(): IncrementHit {
		return new IncrementHit(this.manager);
	}

	public makeFindShortenedUrl(): FindShortenedUrl {
		return new FindShortenedUrl(this.shortUrlRepository, this.manager);
	}

	public makeupdateShortenedUrl(): UpdateShortenedUrl {
		return new UpdateShortenedUrl(this.shortUrlRepository, this.manager);
	}

	public makeGenerateCode(): GenerateCode {
		return new GenerateCode(this.manager);
	}

	public makereturnShortenedUrl(): ReturnShortenedUrl {
		return new ReturnShortenedUrl(this.manager);
	}

	public makesaveShortenedUrl(): SaveShortenedUrl {
		return new SaveShortenedUrl(this.shortUrlRepository, this.manager);
	}
}
