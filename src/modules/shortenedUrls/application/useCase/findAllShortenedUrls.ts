import { ShortenedUrl } from '@modules/shortenedUrls/domain/shortenedUrl';
import { IRepository } from '@modules/shortenedUrls/external/db/IRepository';
import { IFindAllShortenedUrls } from '../interface/IFindAllShortenedUrls';

export class FindAllShortenedUrls implements IFindAllShortenedUrls {
	private readonly repository: IRepository;

	constructor(repository: IRepository) {
		this.repository = repository;
	}

	async execute(ownerId: number): Promise<ShortenedUrl[]> {
		return await this.repository.findAllByOwnerId(ownerId);
	}
}
