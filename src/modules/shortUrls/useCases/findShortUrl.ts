import { BaseRepository } from 'infra/db/baseRepository';
import { ShortUrl } from '../shortUrl';

export class FindShortUrl {
	private readonly shortUrlRepository: BaseRepository<ShortUrl>;

	constructor(shortUrlRepository: BaseRepository<ShortUrl>) {
		this.shortUrlRepository = shortUrlRepository;
	}

	async execute(code: string): Promise<ShortUrl[]> {
		const shortUrl = await this.shortUrlRepository.findOne(code);
		if (!shortUrl) return [];
		return [shortUrl];
	}
}
