import { ShortUrl } from '@modules/shortUrls/shortUrl';
import { BaseRepository } from './baseRepository';

export interface IShortUrlRepository extends BaseRepository<ShortUrl> {
	getShortUrlByCode(code: string): Promise<ShortUrl | null>;
	getShortUrlOwnedByOwnerId(ownerId: number): Promise<ShortUrl[]>;
}
