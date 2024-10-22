import { ShortenedUrl } from '@modules/shortenedUrls/domain/shortenedUrl';

export interface IFindShortenedUrl {
	execute(code: string): Promise<ShortenedUrl | undefined>;
}
