import { IShortenedUrlUseCaseFactory } from '@infra/factories/useCases/IShortenedUrlUseCaseFactory';
import { CreateShortenedUrl } from '@modules/shortenedUrls/controllers/createShortenedUrl';
import { IFindShortenedUrl } from '@modules/shortenedUrls/useCases/findShortenedUrl';
import {
	GenerateCode,
	IGenerateCode,
} from '@modules/shortenedUrls/useCases/generateCode';
import { IIncrementHit } from '@modules/shortenedUrls/useCases/incrementHit';
import {
	IReturnShortenedUrl,
	ReturnShortenedUrl,
} from '@modules/shortenedUrls/useCases/returnShortenedUrl';
import {
	ISaveShortenedUrl,
	SaveShortenedUrl,
} from '@modules/shortenedUrls/useCases/saveShortenedUrl';
import { IUpdateShortenedUrl } from '@modules/shortenedUrls/useCases/updateShortenedUrl';
import { IController } from '@shared/IController';
import { CacheDummy } from '../../../testDoubles/dummy/cache';
import { EventManagerDummy } from '../../../testDoubles/dummy/eventManager';
import { QueueDummy } from '../../../testDoubles/dummy/queue';
import { ShortenedUrlRepositoryDummy } from '../../../testDoubles/dummy/shortenedUrlRepository';

let createShortenedUrl: IController;

class UseCaseFactoryDummy implements IShortenedUrlUseCaseFactory {
	eventManagerDummy = new EventManagerDummy();
	shortUrlRepository: ShortenedUrlRepositoryDummy =
		new ShortenedUrlRepositoryDummy();

	makeGenerateCode(): IGenerateCode {
		return new GenerateCode(this.eventManagerDummy);
	}
	makeReturnShortenedUrl(): IReturnShortenedUrl {
		return new ReturnShortenedUrl(this.eventManagerDummy);
	}
	makeSaveShortenedUrl(): ISaveShortenedUrl {
		return new SaveShortenedUrl(
			this.shortUrlRepository,
			this.eventManagerDummy,
		);
	}
	makeFindShortenedUrl(): IFindShortenedUrl {
		throw new Error('Method not implemented.');
	}
	makeIncrementHit(): IIncrementHit {
		throw new Error('Method not implemented.');
	}
	makeUpdateShortenedUrl(): IUpdateShortenedUrl {
		throw new Error('Method not implemented.');
	}
}

const makeSut = () => {
	const useCaseFactoryDummy = new UseCaseFactoryDummy();
	const eventManagerDummy = new EventManagerDummy();
	const cacheDummy = new CacheDummy();
	const queueDummy = new QueueDummy();
	return new CreateShortenedUrl(
		useCaseFactoryDummy,
		eventManagerDummy,
		cacheDummy,
		queueDummy,
	);
};

describe('Create short url', () => {
	beforeEach(() => {
		createShortenedUrl = makeSut();
	});

	test('Should return 201 when short url is created', async () => {
		const response = await createShortenedUrl.handle({
			body: { url: 'teste' },
		});
		expect(response.status).toBe(201);
	});

	test('Should return the short url', async () => {
		const response = await createShortenedUrl.handle({
			body: { url: 'teste' },
		});
		expect(response.body).not.toBeUndefined();
	});
});
