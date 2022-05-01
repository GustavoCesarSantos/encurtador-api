import { IShortUrlRepository } from '@infra/db/shortUrlRepository';
import { ShortUrl } from '@modules/shortUrls/shortUrl';

export class ShortUrlRepositoryStub implements IShortUrlRepository {
	async getShortUrlOwnedByOwnerId(ownerId: number): Promise<ShortUrl[]> {
		const shortUrl = ShortUrl.create({ url: 'teste', code: '12345' });
		if (shortUrl instanceof Error) return [];
		return [shortUrl];
	}

	async getShortUrlByCode(code: string): Promise<ShortUrl | null> {
		if (code === 'success') {
			const shortUrl = ShortUrl.create({ url: 'teste', code: '12345' });
			if (shortUrl instanceof Error) return null;
			return shortUrl;
		}
		return null;
	}
	save(entity: ShortUrl): Promise<void> {
		throw new Error('Method not implemented.');
	}
	update(uuid: string, data: object): Promise<void> {
		throw new Error('Method not implemented.');
	}
	delete(uuid: string): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
