import { BaseRepository } from 'infra/db/baseRepository';
import { ShortUrl } from '../shortUrl';

export class FindShortUrls {
	private readonly shortUrlRepository: BaseRepository<ShortUrl>;

	constructor(shortUrlRepository: BaseRepository<ShortUrl>) {
		this.shortUrlRepository = shortUrlRepository;
	}

	async execute() {
		const shortUrls = await this.shortUrlRepository.findMany();
		return shortUrls;
	}
}
