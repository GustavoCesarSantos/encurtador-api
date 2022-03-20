import { BaseRepository } from '@infra/db/baseRepository';
import { ShortUrl } from '../shortUrl';

export interface IUpdateShortUrl {
	execute(identifier: string, data: object): Promise<void>;
}

export class UpdateShortUrl implements IUpdateShortUrl {
	private readonly shortUrlRepository: BaseRepository<ShortUrl>;

	constructor(shortUrlRepository: BaseRepository<ShortUrl>) {
		this.shortUrlRepository = shortUrlRepository;
	}

	async execute(identifier: string, data: object): Promise<void> {
		await this.shortUrlRepository.update(identifier, data);
	}
}
