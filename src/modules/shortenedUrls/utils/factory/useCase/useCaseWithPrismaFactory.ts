import { IRepository } from '@modules/shortenedUrls/external/db/IRepository';
import { IUseCaseFactory } from './IUseCaseFactory';
import { FindShortenedUrl } from '@modules/shortenedUrls/application/useCase/findShortenedUrl';
import { GenerateCode } from '@modules/shortenedUrls/application/useCase/generateCode';
import { SaveShortenedUrl } from '@modules/shortenedUrls/application/useCase/saveShortenedUrl';
import { Repository } from '@modules/shortenedUrls/external/db/prisma/repository';

export class UseCaseWithPrismaFactory implements IUseCaseFactory {
	private readonly repository: IRepository = new Repository();

	public makeFindShortenedUrl(): FindShortenedUrl {
		return new FindShortenedUrl(this.repository);
	}

	public makeGenerateCode(): GenerateCode {
		return new GenerateCode();
	}

	public makeSaveShortenedUrl(): SaveShortenedUrl {
		return new SaveShortenedUrl(this.repository);
	}
}
