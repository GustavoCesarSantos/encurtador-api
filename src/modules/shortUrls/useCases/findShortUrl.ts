import { IShortUrlRepository } from '@infra/db/shortUrlRepository';
import { ShortUrl } from '../shortUrl';

export interface IFindShortUrl {
	execute(code: string): Promise<ShortUrl | null>;
}

export class FindShortUrl implements IFindShortUrl {
	private readonly shortUrlRepository: IShortUrlRepository;

	constructor(shortUrlRepository: IShortUrlRepository) {
		this.shortUrlRepository = shortUrlRepository;
	}

	async execute(code: string): Promise<ShortUrl | null> {
		const shortUrl = await this.shortUrlRepository.getShortUrlByCode(code);
		if (!shortUrl || !(shortUrl instanceof ShortUrl)) return null;
		return shortUrl;
	}
}
