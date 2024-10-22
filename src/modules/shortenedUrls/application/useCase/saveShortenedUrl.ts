import { ShortenedUrl } from '@modules/shortenedUrls/domain/shortenedUrl';
import { IRepository } from '@modules/shortenedUrls/external/db/IRepository';
import { ISaveShortenedUrl } from '../interface/ISaveShortenedUrl';

export class SaveShortenedUrl implements ISaveShortenedUrl {
	private readonly repository: IRepository;

	constructor(repository: IRepository) {
		this.repository = repository;
	}

	async execute(url: string, code: string): Promise<void | Error> {
		const shortenedUrlOrError = ShortenedUrl.create({
			url,
			code,
		});
		if (shortenedUrlOrError instanceof Error) {
			return shortenedUrlOrError;
		}
		await this.repository.save(shortenedUrlOrError);
	}
}
