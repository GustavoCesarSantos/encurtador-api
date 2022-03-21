import { BaseRepository } from '@infra/db/baseRepository';
import { ShortUrl } from '../shortUrl';

export interface IFindShortUrls {
	execute(): Promise<ShortUrl[]>;
}

export class FindShortUrls implements IFindShortUrls {
	private readonly shortUrlRepository: BaseRepository<ShortUrl>;

	constructor(shortUrlRepository: BaseRepository<ShortUrl>) {
		this.shortUrlRepository = shortUrlRepository;
	}

	async execute(): Promise<ShortUrl[]> {
		const shortUrls = await this.shortUrlRepository.findMany();
		return shortUrls;
	}
}
