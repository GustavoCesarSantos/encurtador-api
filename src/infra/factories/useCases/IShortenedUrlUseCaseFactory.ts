import { IFindShortenedUrl } from '@modules/shortenedUrls/useCases/findShortenedUrl';
import { IGenerateCode } from '@modules/shortenedUrls/useCases/generateCode';
import { IIncrementHit } from '@modules/shortenedUrls/useCases/incrementHit';
import { IReturnShortenedUrl } from '@modules/shortenedUrls/useCases/returnShortenedUrl';
import { ISaveShortenedUrl } from '@modules/shortenedUrls/useCases/saveShortenedUrl';
import { IUpdateShortenedUrl } from '@modules/shortenedUrls/useCases/updateShortenedUrl';

export interface IShortenedUrlUseCaseFactory {
	makeIncrementHit(): IIncrementHit;
	makeFindShortenedUrl(): IFindShortenedUrl;
	makeUpdateShortenedUrl(): IUpdateShortenedUrl;
	makeGenerateCode(): IGenerateCode;
	makeReturnShortenedUrl(): IReturnShortenedUrl;
	makeSaveShortenedUrl(): ISaveShortenedUrl;
}
