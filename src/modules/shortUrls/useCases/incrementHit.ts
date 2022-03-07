import { BaseRepository } from 'infra/db/baseRepository';
import { ShortUrl } from '../shortUrl';

export class IncrementHit {
	private readonly shortUrlRepository: BaseRepository<ShortUrl>;

	constructor(shortUrlRepository: BaseRepository<ShortUrl>) {
		this.shortUrlRepository = shortUrlRepository;
	}

	async execute(uuid: string, hit: number): Promise<void> {
		hit++;
		const data = { hit };
		await this.shortUrlRepository.update(uuid, data);
	}
}
