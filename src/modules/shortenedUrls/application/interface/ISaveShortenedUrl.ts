import { ShortenUrlInput } from '@modules/shortenedUrls/presentation/dtos/shortenUrlInput';

export interface ISaveShortenedUrl {
	execute(data: ShortenUrlInput): Promise<void | Error>;
}
