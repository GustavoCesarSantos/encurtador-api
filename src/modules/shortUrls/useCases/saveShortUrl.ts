import { ShortUrl } from '@/shortUrls/shortUrl';
import { BaseRepository } from 'infra/db/baseRepository';

export interface ISaveShortUrl {
	execute(url: string, code: string): Promise<void>;
}

export class SaveShortUrl implements ISaveShortUrl {
	private readonly shortUrlRepository: BaseRepository<ShortUrl>;

	constructor(shortUrlRepository: BaseRepository<ShortUrl>) {
		this.shortUrlRepository = shortUrlRepository;
	}

	async execute(url: string, code: string): Promise<void> {
		const shortUrl = new ShortUrl({
			url,
			code,
		});
		await this.shortUrlRepository.save(shortUrl);
	}
}
