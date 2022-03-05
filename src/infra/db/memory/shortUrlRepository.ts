import { ShortUrl } from '@/shortUrls/shortUrl';
import { BaseRepository } from '../baseRepository';

export class ShortUrlRepository implements BaseRepository<ShortUrl> {
	async save(entity: ShortUrl): Promise<void> {
		throw new Error('Method not implemented.');
	}
	async findMany(): Promise<ShortUrl[]> {
		throw new Error('Method not implemented.');
	}
	async findOne(identifier: string): Promise<ShortUrl | null> {
		throw new Error('Method not implemented.');
	}
	async update(): Promise<void> {
		throw new Error('Method not implemented.');
	}
	async delete(): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
