import { ShortenedUrl } from '@modules/shortenedUrls/shortenedUrl';
import { BaseRepository } from './baseRepository';

export interface IShortenedUrlRepository extends BaseRepository<ShortenedUrl> {
	getShortenedUrlByCode(code: string): Promise<ShortenedUrl | null>;
	getShortenedUrlOwnedByOwnerId(ownerId: number): Promise<ShortenedUrl[]>;
}
