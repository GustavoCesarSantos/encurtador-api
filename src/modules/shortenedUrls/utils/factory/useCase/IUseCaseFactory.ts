import { IFindShortenedUrl } from '@modules/shortenedUrls/application/interface/IFindShortenedUrl';
import { IGenerateCode } from '@modules/shortenedUrls/application/interface/IGenerateCode';
import { ISaveShortenedUrl } from '@modules/shortenedUrls/application/interface/ISaveShortenedUrl';

export interface IUseCaseFactory {
	makeFindShortenedUrl(): IFindShortenedUrl;
	makeGenerateCode(): IGenerateCode;
	makeSaveShortenedUrl(): ISaveShortenedUrl;
}
