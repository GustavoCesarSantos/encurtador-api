import { IShortUrlRepository } from '@infra/db/shortUrlRepository';
import { ShortUrl } from '../shortUrl';

export interface IFindShortUrls {
	execute(ownerId: number): Promise<ShortUrl[]>;
}

export class FindShortUrls implements IFindShortUrls {
	private readonly shortUrlRepository: IShortUrlRepository;

	constructor(shortUrlRepository: IShortUrlRepository) {
		this.shortUrlRepository = shortUrlRepository;
	}

	async execute(ownerId: number): Promise<ShortUrl[]> {
		const shortUrls =
			await this.shortUrlRepository.getShortUrlOwnedByOwnerId(ownerId);
		return shortUrls;
	}
}
