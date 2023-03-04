import { IShortenedUrlRepository } from '@infra/db/shortenedUrlRepository';
import { ShortenedUrl } from '@modules/shortenedUrls/shortenedUrl';

export class ShortenedUrlRepositoryDummy implements IShortenedUrlRepository {
	async getShortenedUrlOwnedByOwnerId(
		ownerId: number,
	): Promise<ShortenedUrl[]> {
		return [];
	}
	async getShortenedUrlByCode(code: string): Promise<ShortenedUrl | null> {
		return null;
	}
	async save(entity: ShortenedUrl): Promise<void> {
		return;
	}
	async update(uuid: string, data: object): Promise<void> {
		return;
	}
	async delete(uuid: string): Promise<void> {
		return;
	}
}
