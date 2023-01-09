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
import { CacheDummy } from '../../../testDoubles/dummy/cache';
import { EventManagerDummy } from '../../../testDoubles/dummy/eventManager';
import { QueueDummy } from '../../../testDoubles/dummy/queue';
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
	const cacheDummy = new CacheDummy();
	const queueDummy = new QueueDummy();
	return new AccessRootUrl(
		useCaseFactoryDummy,
		eventManagerDummy,
		cacheDummy,
		// queueDummy,
	);
};

describe('Create short url', () => {
	beforeEach(() => {
		accessRootUrl = makeSut();
	});

	test('Should return 200 when foot url is found', async () => {
		const response = await accessRootUrl.handle({
			params: { code: 'success' },
		});
		expect(response.status).toBe(200);
	});

	test('Should return root url when this is found', async () => {
		const response = await accessRootUrl.handle({
			params: { code: 'success' },
		});
		expect(response.body).toStrictEqual({ rootUrl: 'teste' });
	});
});
