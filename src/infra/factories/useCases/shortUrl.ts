import { ShortUrlRepository } from '@infra/db/prisma/shortUrlRepository';
import { FindShortUrl } from '@modules/shortUrls/useCases/findShortUrl';
import { GenerateCode } from '@modules/shortUrls/useCases/generateCode';
import { IncrementHit } from '@modules/shortUrls/useCases/incrementHit';
import { ReturnShortUrl } from '@modules/shortUrls/useCases/returnShortUrl';
import { SaveShortUrl } from '@modules/shortUrls/useCases/saveShortUrl';
import { UpdateShortUrl } from '@modules/shortUrls/useCases/updateShortUrl';
import { IShortUrlUseCaseFactory } from './IShortUrlUseCaseFactory';

export class ShortUrlUseCaseFactory implements IShortUrlUseCaseFactory {
	private readonly shortUrlRepository: ShortUrlRepository =
		new ShortUrlRepository();

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
		return new GenerateCode();
	}

	public makeReturnShortUrl(): ReturnShortUrl {
		return new ReturnShortUrl();
	}

	public makeSaveShortUrl(): SaveShortUrl {
		return new SaveShortUrl(this.shortUrlRepository);
	}
}
