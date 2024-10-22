import { ShortenUrlInput } from '@modules/shortenedUrls/presentation/dtos/shortenUrlRequest';

export interface ISaveShortenedUrl {
	execute(data: ShortenUrlRequest): Promise<void | Error>;
}
