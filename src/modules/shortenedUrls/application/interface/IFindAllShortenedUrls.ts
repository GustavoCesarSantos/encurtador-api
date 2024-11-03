import { ShortenedUrl } from '@modules/shortenedUrls/domain/shortenedUrl';

export interface IFindAllShortenedUrls {
	execute(ownerId: number): Promise<ShortenedUrl[]>;
}
