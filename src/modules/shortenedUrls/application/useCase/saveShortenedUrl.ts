import { ShortenedUrl } from '@modules/shortenedUrls/domain/shortenedUrl';
import { IRepository } from '@modules/shortenedUrls/external/db/IRepository';
import { ISaveShortenedUrl } from '../interface/ISaveShortenedUrl';
import { ShortenUrlInput } from '@modules/shortenedUrls/presentation/dtos/shortenUrlRequest';

export class SaveShortenedUrl implements ISaveShortenedUrl {
	private readonly repository: IRepository;

	constructor(repository: IRepository) {
		this.repository = repository;
	}

	async execute(data: ShortenUrlRequest): Promise<void | Error> {
		const shortenedUrlOrError = ShortenedUrl.create({
			...data,
			accessCounter: 0,
		});
		if (shortenedUrlOrError instanceof Error) {
			return shortenedUrlOrError;
		}
		await this.repository.save(shortenedUrlOrError);
	}
}
