import { BaseRepository } from '@infra/db/baseRepository';
import { ShortUrl } from '../shortUrl';

export interface IFindShortUrl {
	execute(code: string): Promise<ShortUrl | null>;
}

export class FindShortUrl implements IFindShortUrl {
	private readonly shortUrlRepository: BaseRepository<ShortUrl>;

	constructor(shortUrlRepository: BaseRepository<ShortUrl>) {
		this.shortUrlRepository = shortUrlRepository;
	}

	async execute(code: string): Promise<ShortUrl | null> {
		const shortUrl = await this.shortUrlRepository.findOne(code);
		if (!shortUrl || !(shortUrl instanceof ShortUrl)) return null;
		return shortUrl;
	}
}
