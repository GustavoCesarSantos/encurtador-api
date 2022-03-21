import { IFindShortUrl } from '@modules/shortUrls/useCases/findShortUrl';
import { IGenerateCode } from '@modules/shortUrls/useCases/generateCode';
import { IIncrementHit } from '@modules/shortUrls/useCases/incrementHit';
import { IReturnShortUrl } from '@modules/shortUrls/useCases/returnShortUrl';
import { ISaveShortUrl } from '@modules/shortUrls/useCases/saveShortUrl';
import { IUpdateShortUrl } from '@modules/shortUrls/useCases/updateShortUrl';

export interface IShortUrlUseCaseFactory {
	makeIncrementHit(): IIncrementHit;
	makeFindShortUrl(): IFindShortUrl;
	makeUpdateShortUrl(): IUpdateShortUrl;
	makeGenerateCode(): IGenerateCode;
	makeReturnShortUrl(): IReturnShortUrl;
	makeSaveShortUrl(): ISaveShortUrl;
}
