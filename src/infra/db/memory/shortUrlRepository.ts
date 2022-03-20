import { ShortUrl } from '@modules/shortUrls/shortUrl';
import { BaseRepository } from '../baseRepository';

export class ShortUrlRepository implements BaseRepository<ShortUrl> {
	shortUrls: ShortUrl[] = [];

	async save(entity: ShortUrl): Promise<void> {
		this.shortUrls.push(entity);
	}

	findMany(): Promise<ShortUrl[]> {
		throw new Error('Method not implemented.');
	}

	async findOne(identifier: string): Promise<ShortUrl | null> {
		if (identifier === 'success') {
			const shortUrl = ShortUrl.create({
				url: 'teste',
				code: identifier,
			});
			if (shortUrl instanceof Error) return null;
			return shortUrl;
		}
		if (identifier === 'fail') {
			return null;
		}
		const result = this.shortUrls.find(
			shortUrl => shortUrl.getCode() === identifier,
		);
		if (!result) return null;
		return result;
	}

	update(identifier: string, data: object): Promise<void> {
		throw new Error('Method not implemented.');
	}

	delete(uuid: string): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
