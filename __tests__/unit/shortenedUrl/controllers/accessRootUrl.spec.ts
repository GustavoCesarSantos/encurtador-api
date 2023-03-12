import { NotFound } from '@helpers/errors/notFound';
import { IShortenedUrlUseCaseFactory } from '@infra/factories/useCases/IShortenedUrlUseCaseFactory';
import { AccessRootUrl } from '@modules/shortenedUrls/controllers/accessRootUrl';
import { ShortenedUrl } from '@modules/shortenedUrls/shortenedUrl';
import { IFindShortenedUrl } from '@modules/shortenedUrls/useCases/findShortenedUrl';
import { IGenerateCode } from '@modules/shortenedUrls/useCases/generateCode';
import { IIncrementHit } from '@modules/shortenedUrls/useCases/incrementHit';
import { IReturnShortenedUrl } from '@modules/shortenedUrls/useCases/returnShortenedUrl';
import { ISaveShortenedUrl } from '@modules/shortenedUrls/useCases/saveShortenedUrl';
import { IUpdateShortenedUrl } from '@modules/shortenedUrls/useCases/updateShortenedUrl';
import { IController } from '@shared/IController';
import { CacheDummy } from '../../../testDoubles/dummy/cache';
import { EventManagerDummy } from '../../../testDoubles/dummy/eventManager';
import { QueueDummy } from '../../../testDoubles/dummy/queue';

let accessRootUrl: IController;

class FindShortenedUrlFakie implements IFindShortenedUrl {
	async execute(code: string): Promise<ShortenedUrl | null> {
		if (code === 'success') {
			const shortenedUrl = ShortenedUrl.create({ code, url: 'teste' });
			if (shortenedUrl instanceof Error) return null;
			return shortenedUrl;
		}
		return null;
	}
}

class IncrementHitDummy implements IIncrementHit {
	async execute(uuid: string): Promise<void> {
		return;
	}
}

class updateShortenedUrlDummy implements IUpdateShortenedUrl {
	async execute(identifier: string, data: any): Promise<void> {
		return;
	}
}

class UseCaseFactoryDummy implements IShortenedUrlUseCaseFactory {
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
		return new FindShortenedUrlFakie();
	}
	makeIncrementHit(): IIncrementHit {
		return new IncrementHitDummy();
	}
	makeUpdateShortenedUrl(): IUpdateShortenedUrl {
		return new updateShortenedUrlDummy();
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

describe('Access root url', () => {
	beforeEach(() => {
		accessRootUrl = makeSut();
	});

	test('Should return 400 when code is not provided', async () => {
		const response = await accessRootUrl.handle({ params: { code: '' } });
		expect(response.status).toBe(400);
	});

	test('Should return a missing params error when code is not provided', async () => {
		const response = await accessRootUrl.handle({ params: { code: '' } });
		expect(response.body).toStrictEqual({
			message: 'Missing params: Code',
		});
	});

	test('Should return 404 when short url schema is not found', async () => {
		const response = await accessRootUrl.handle({
			params: { code: 'fail' },
		});
		expect(response.status).toBe(404);
	});

	test('Should return a not found error when short url schema is not found', async () => {
		const response = await accessRootUrl.handle({
			params: { code: 'fail' },
		});
		expect(response.body).toStrictEqual({
			message: new NotFound().message,
		});
	});

	test('Should return 200 when root url is found', async () => {
		const response = await accessRootUrl.handle({
			params: { code: 'success' },
		});
		expect(response.status).toBe(200);
	});

	test('Should return root url when is found', async () => {
		const response = await accessRootUrl.handle({
			params: { code: 'success' },
		});
		expect(response.body).toStrictEqual({ rootUrl: 'teste' });
	});
});
