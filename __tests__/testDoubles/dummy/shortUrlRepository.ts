import { IShortUrlRepository } from '@infra/db/shortUrlRepository';
import { ShortUrl } from '@modules/shortUrls/shortUrl';

export class ShortUrlRepositoryDummy implements IShortUrlRepository {
	async getShortUrlOwnedByOwnerId(ownerId: number): Promise<ShortUrl[]> {
		return [];
	}
	async getShortUrlByCode(code: string): Promise<ShortUrl | null> {
		return null;
	}
	async save(entity: ShortUrl): Promise<void> {
		return;
	}
	async update(uuid: string, data: object): Promise<void> {
		return;
	}
	async delete(uuid: string): Promise<void> {
		return;
	}
}
