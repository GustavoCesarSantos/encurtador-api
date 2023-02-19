import { IShortenedUrlRepository } from '@infra/db/shortenedUrlRepository';
import { ShortenedUrl } from '../shortenedUrl';

export interface IFindShortenedUrls {
	execute(ownerId: number): Promise<ShortenedUrl[]>;
}

export class FindShortenedUrls implements IFindShortenedUrls {
	private readonly shortenedUrlRepository: IShortenedUrlRepository;

	constructor(shortenedUrlRepository: IShortenedUrlRepository) {
		this.shortenedUrlRepository = shortenedUrlRepository;
	}

	async execute(ownerId: number): Promise<ShortenedUrl[]> {
		const shortenedUrls =
			await this.shortenedUrlRepository.getShortenedUrlOwnedByOwnerId(
				ownerId,
			);
		return shortenedUrls;
	}
}
