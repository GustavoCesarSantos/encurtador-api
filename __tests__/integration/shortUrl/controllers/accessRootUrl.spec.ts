import { IShortUrlUseCaseFactory } from '@infra/factories/useCases/IShortUrlUseCaseFactory';
import { AccessRootUrl } from '@modules/shortUrls/controllers/accessRootUrl';
import {
	FindShortUrl,
	IFindShortUrl,
} from '@modules/shortUrls/useCases/findShortUrl';
import { IGenerateCode } from '@modules/shortUrls/useCases/generateCode';
import {
	IIncrementHit,
	IncrementHit,
} from '@modules/shortUrls/useCases/incrementHit';
import { IReturnShortUrl } from '@modules/shortUrls/useCases/returnShortUrl';
import { ISaveShortUrl } from '@modules/shortUrls/useCases/saveShortUrl';
import {
	IUpdateShortUrl,
	UpdateShortUrl,
} from '@modules/shortUrls/useCases/updateShortUrl';
import { IController } from '@shared/IController';
import { EventManagerDummy } from '../../../testDoubles/dummy/eventManager';
import { ShortUrlRepositoryStub } from '../../../testDoubles/stub/shortUrlRepository';

let accessRootUrl: IController;

class UseCaseFactoryDummy implements IShortUrlUseCaseFactory {
	shortUrlRepository: ShortUrlRepositoryStub = new ShortUrlRepositoryStub();
	eventManagerDummy = new EventManagerDummy();

	makeGenerateCode(): IGenerateCode {
		throw new Error('Method not implemented.');
	}
	makeReturnShortUrl(): IReturnShortUrl {
		throw new Error('Method not implemented.');
	}
	makeSaveShortUrl(): ISaveShortUrl {
		throw new Error('Method not implemented.');
	}
	makeFindShortUrl(): IFindShortUrl {
		return new FindShortUrl(
			this.shortUrlRepository,
			this.eventManagerDummy,
		);
	}
	makeIncrementHit(): IIncrementHit {
		return new IncrementHit(this.eventManagerDummy);
	}
	makeUpdateShortUrl(): IUpdateShortUrl {
		return new UpdateShortUrl(
			this.shortUrlRepository,
			this.eventManagerDummy,
		);
	}
}

const makeSut = () => {
	const useCaseFactoryDummy = new UseCaseFactoryDummy();
	const eventManagerDummy = new EventManagerDummy();
	return new AccessRootUrl(useCaseFactoryDummy, eventManagerDummy);
};

describe('Create short url', () => {
	beforeEach(() => {
		accessRootUrl = makeSut();
	});

	test('Should return 302 when short url can be redirect', async () => {
		const response = await accessRootUrl.handle({
			params: { code: 'success' },
		});
		expect(response.status).toBe(302);
	});

	test('Should return root url when this can be redirect', async () => {
		const response = await accessRootUrl.handle({
			params: { code: 'success' },
		});
		expect(response.body).toStrictEqual({ rootUrl: 'teste' });
	});
});
