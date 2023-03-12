import { IShortenedUrlUseCaseFactory } from '@infra/factories/useCases/IShortenedUrlUseCaseFactory';
import { AccessRootUrl } from '@modules/shortenedUrls/controllers/accessRootUrl';
import {
	FindShortenedUrl,
	IFindShortenedUrl,
} from '@modules/shortenedUrls/useCases/findShortenedUrl';
import { IGenerateCode } from '@modules/shortenedUrls/useCases/generateCode';
import {
	IIncrementHit,
	IncrementHit,
} from '@modules/shortenedUrls/useCases/incrementHit';
import { IReturnShortenedUrl } from '@modules/shortenedUrls/useCases/returnShortenedUrl';
import { ISaveShortenedUrl } from '@modules/shortenedUrls/useCases/saveShortenedUrl';
import {
	IUpdateShortenedUrl,
	UpdateShortenedUrl,
} from '@modules/shortenedUrls/useCases/updateShortenedUrl';
import { IController } from '@shared/IController';
import { CacheDummy } from '../../../testDoubles/dummy/cache';
import { EventManagerDummy } from '../../../testDoubles/dummy/eventManager';
import { QueueDummy } from '../../../testDoubles/dummy/queue';
import { ShortenedUrlRepositoryStub } from '../../../testDoubles/stub/shortUrlRepository';

let accessRootUrl: IController;

class UseCaseFactoryDummy implements IShortenedUrlUseCaseFactory {
	shortUrlRepository: ShortenedUrlRepositoryStub =
		new ShortenedUrlRepositoryStub();
	eventManagerDummy = new EventManagerDummy();

	makeGenerateCode(): IGenerateCode {
		throw new Error('Method not implemented.');
	}
	makeReturnShortenedUrl(): IReturnShortenedUrl {
		throw new Error('Method not implemented.');
	}
	makeSaveShortenedUrl(): ISaveShortenedUrl {
		throw new Error('Method not implemented.');
	}
	makeFindShortenedUrl(): IFindShortenedUrl {
		return new FindShortenedUrl(
			this.shortUrlRepository,
			this.eventManagerDummy,
		);
	}
	makeIncrementHit(): IIncrementHit {
		return new IncrementHit(
			this.shortUrlRepository,
			this.eventManagerDummy,
		);
	}
	makeUpdateShortenedUrl(): IUpdateShortenedUrl {
		return new UpdateShortenedUrl(
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
		queueDummy,
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
