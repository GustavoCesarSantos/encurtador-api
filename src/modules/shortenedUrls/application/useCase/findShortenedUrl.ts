import { IFindShortenedUrl } from '../interface/IFindShortenedUrl';
import { ShortenedUrl } from '@modules/shortenedUrls/domain/shortenedUrl';
import { IRepository } from '@modules/shortenedUrls/external/db/IRepository';

export class FindShortenedUrl implements IFindShortenedUrl {
	private readonly repository: IRepository;

	constructor(repository: IRepository) {
		this.repository = repository;
	}

	async execute(code: string): Promise<ShortenedUrl | undefined> {
		return await this.repository.findByCode(code);
	}
}
