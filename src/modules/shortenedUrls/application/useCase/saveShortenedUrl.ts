import { ShortenedUrl } from '@modules/shortenedUrls/domain/shortenedUrl';
import { IRepository } from '@modules/shortenedUrls/external/db/IRepository';
import { ShortenUrlInput } from '@modules/shortenedUrls/presentation/dtos/shortenUrlInput';
import { ISaveShortenedUrl } from '../interface/ISaveShortenedUrl';

export class SaveShortenedUrl implements ISaveShortenedUrl {
	private readonly repository: IRepository;

	constructor(repository: IRepository) {
		this.repository = repository;
	}

	async execute(data: ShortenUrlInput): Promise<void | Error> {
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
