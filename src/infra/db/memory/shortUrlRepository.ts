import { ShortUrl } from '@modules/shortUrls/shortUrl';
import { BaseRepository } from '../baseRepository';

export class ShortUrlRepository implements BaseRepository<ShortUrl> {
	shortenedUrls: any[] = [
		{
			uuid: 'teste',
			rootUrl: 'teste',
			code: 'success',
			hits: 0,
			ownerid: 0,
			createdat: new Date(),
		},
	];

	async save(entity: ShortUrl): Promise<void> {
		this.shortenedUrls.push(entity);
	}
	findMany(): Promise<ShortUrl[]> {
		throw new Error('Method not implemented.');
	}
	async findOne(identifier: string): Promise<ShortUrl | null> {
		const shortUrlDB = this.shortenedUrls.find(
			shortUrl => shortUrl.code === identifier,
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
