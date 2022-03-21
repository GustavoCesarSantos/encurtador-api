import { BaseRepository } from '@infra/db/baseRepository';
import { ShortUrl } from '../shortUrl';

export interface IDeleteShortUrl {
	execute(uuid: string): Promise<void>;
}

export class DeleteShortUrl implements IDeleteShortUrl {
	private readonly shortUrlRepository: BaseRepository<ShortUrl>;

	constructor(shortUrlRepository: BaseRepository<ShortUrl>) {
		this.shortUrlRepository = shortUrlRepository;
	}

	async execute(uuid: string): Promise<void> {
		await this.shortUrlRepository.delete(uuid);
	}
}
