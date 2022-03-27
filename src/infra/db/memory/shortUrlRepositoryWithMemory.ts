import { ShortUrl } from '@modules/shortUrls/shortUrl';
import { IShortUrlRepository } from '../shortUrlRepository';

export class ShortUrlRepositoryWithMemory implements IShortUrlRepository {
	shortUrls: ShortUrl[] = [];

	async save(entity: ShortUrl): Promise<void> {
		this.shortUrls.push(entity);
	}

	async getShortUrlByCode(code: string): Promise<ShortUrl | null> {
		if (code === 'success') {
			const shortUrl = ShortUrl.create({
				url: 'teste',
				code: code,
			});
			if (shortUrl instanceof Error) return null;
			return shortUrl;
		}
		if (code === 'fail') return null;
		const result = this.shortUrls.find(
			shortUrl => shortUrl.getCode() === code,
		);
		if (!result) return null;
		return result;
	}

	getShortUrlOwnedByOwnerId(ownerId: number): Promise<ShortUrl[]> {
		throw new Error('Method not implemented.');
	}

	update(identifier: string, data: object): Promise<void> {
		throw new Error('Method not implemented.');
	}

	delete(uuid: string): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
