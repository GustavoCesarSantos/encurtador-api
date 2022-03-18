import { ShortUrl } from '@/shortUrls/shortUrl';
import { BaseRepository } from '../baseRepository';

export class ShortUrlRepository implements BaseRepository<ShortUrl> {
	shortenedUrls: ShortUrl[] = [];

	async save(entity: ShortUrl): Promise<void> {
		this.shortenedUrls.push(entity);
	}
	findMany(): Promise<ShortUrl[]> {
		throw new Error('Method not implemented.');
	}
	async findOne(identifier: string): Promise<ShortUrl | null> {
		const shortUrlDB = this.shortenedUrls.find(
			shortUrl => shortUrl.getCode() === identifier,
		);
		if (!shortUrlDB) return null;
		return shortUrlDB;
	}
	update(identifier: string, data: any): Promise<void> {
		throw new Error('Method not implemented.');
	}
	delete(uuid: string): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
