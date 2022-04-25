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
	private readonly manager = new ListenersManager();
	private readonly logger = PinoLogger.create();
	private readonly shortUrlRepository: IShortUrlRepository =
		new ShortUrlRepositoryWithPrisma();

	constructor() {
		this.manager.attach(EventNames.info, [this.logger]);
		this.manager.attach(EventNames.error, [this.logger]);
	}

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
		return new GenerateCode(this.manager);
	}

	public makeReturnShortUrl(): ReturnShortUrl {
		return new ReturnShortUrl(this.manager);
	}

	public makeSaveShortUrl(): SaveShortUrl {
		return new SaveShortUrl(this.shortUrlRepository, this.manager);
	}
}
