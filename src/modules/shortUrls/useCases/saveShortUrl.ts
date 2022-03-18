import { BaseRepository } from '@infra/db/baseRepository';
import { ShortUrl } from '../shortUrl';

export interface ISaveShortUrl {
	execute(url: string, code: string): Promise<void | Error>;
}

export class SaveShortUrl implements ISaveShortUrl {
	private readonly shortUrlRepository: BaseRepository<ShortUrl>;

	constructor(shortUrlRepository: BaseRepository<ShortUrl>) {
		this.shortUrlRepository = shortUrlRepository;
	}

	async execute(url: string, code: string): Promise<void | Error> {
		const shortUrlOrError = ShortUrl.create({
			url,
			code,
		});
		if (shortUrlOrError instanceof Error) return shortUrlOrError;
		await this.shortUrlRepository.save(shortUrlOrError);
	}
}
