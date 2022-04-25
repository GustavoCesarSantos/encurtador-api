import { EventNames } from '@helpers/eventNames';
import { ShortUrlRepositoryWithPrisma } from '@infra/db/prisma/shortUrlRepositoryWithPrisma';
import { IShortUrlRepository } from '@infra/db/shortUrlRepository';
import { ListenersManager } from '@infra/listeners/eventManager';
import { PinoLogger } from '@infra/listeners/loggers/pinoLogger';
import { FindShortUrl } from '@modules/shortUrls/useCases/findShortUrl';
import { GenerateCode } from '@modules/shortUrls/useCases/generateCode';
import { IncrementHit } from '@modules/shortUrls/useCases/incrementHit';
import { ReturnShortUrl } from '@modules/shortUrls/useCases/returnShortUrl';
import { SaveShortUrl } from '@modules/shortUrls/useCases/saveShortUrl';
import { UpdateShortUrl } from '@modules/shortUrls/useCases/updateShortUrl';
import { IShortUrlUseCaseFactory } from './IShortUrlUseCaseFactory';

export class ShortUrlUseCaseFactory implements IShortUrlUseCaseFactory {
	private readonly logger = PinoLogger.create();
	private readonly shortUrlRepository: IShortUrlRepository =
		new ShortUrlRepositoryWithPrisma();

	public makeIncrementHit(): IncrementHit {
		return new IncrementHit();
	}

	public makeFindShortUrl(): FindShortUrl {
		return new FindShortUrl(this.shortUrlRepository);
	}

	public makeUpdateShortUrl(): UpdateShortUrl {
		return new UpdateShortUrl(this.shortUrlRepository);
	}

	public makeGenerateCode(): GenerateCode {
		const manager = new ListenersManager();
		manager.attach(EventNames.info, [this.logger]);
		return new GenerateCode(manager);
	}

	public makeReturnShortUrl(): ReturnShortUrl {
		return new ReturnShortUrl();
	}

	public makeSaveShortUrl(): SaveShortUrl {
		return new SaveShortUrl(this.shortUrlRepository);
	}
}
