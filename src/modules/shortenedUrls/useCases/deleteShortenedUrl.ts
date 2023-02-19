import { BaseRepository } from '@infra/db/baseRepository';
import { ShortenedUrl } from '../shortenedUrl';

export interface IDeleteShortenedUrl {
	execute(uuid: string): Promise<void>;
}

export class DeleteShortenedUrl implements IDeleteShortenedUrl {
	private readonly shortenedUrlRepository: BaseRepository<ShortenedUrl>;

	constructor(shortenedUrlRepository: BaseRepository<ShortenedUrl>) {
		this.shortenedUrlRepository = shortenedUrlRepository;
	}

	async execute(uuid: string): Promise<void> {
		await this.shortenedUrlRepository.delete(uuid);
	}
}
