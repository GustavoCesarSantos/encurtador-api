import { NotFound } from '@helpers/errors/notFound';
import { IShortUrlUseCaseFactory } from '@infra/factories/useCases/IShortUrlUseCaseFactory';
import { AccessRootUrl } from '@modules/shortUrls/controllers/accessRootUrl';
import { ShortUrl } from '@modules/shortUrls/shortUrl';
import { IFindShortUrl } from '@modules/shortUrls/useCases/findShortUrl';
import { IGenerateCode } from '@modules/shortUrls/useCases/generateCode';
import { IIncrementHit } from '@modules/shortUrls/useCases/incrementHit';
import { IReturnShortUrl } from '@modules/shortUrls/useCases/returnShortUrl';
import { ISaveShortUrl } from '@modules/shortUrls/useCases/saveShortUrl';
import { IUpdateShortUrl } from '@modules/shortUrls/useCases/updateShortUrl';
import { IController } from '@shared/IController';
import { CacheDummy } from '../../../testDoubles/dummy/cache';
import { EventManagerDummy } from '../../../testDoubles/dummy/eventManager';
import { QueueDummy } from '../../../testDoubles/dummy/queue';

let accessRootUrl: IController;

class FindShortUrlFakie implements IFindShortUrl {
	async execute(code: string): Promise<ShortUrl | null> {
		if (code === 'success') {
			const shortUrl = ShortUrl.create({ code, url: 'teste' });
			if (shortUrl instanceof Error) return null;
			return shortUrl;
		}
		return null;
	}
}

class IncrementHitDummy implements IIncrementHit {
	execute(hit: number): number {
		return 1;
	}
}

class UpdateShortUrlDummy implements IUpdateShortUrl {
	async execute(identifier: string, data: any): Promise<void> {
		return;
	}
}

class UseCaseFactoryDummy implements IShortUrlUseCaseFactory {
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
		return new FindShortUrlFakie();
	}
	makeIncrementHit(): IIncrementHit {
		return new IncrementHitDummy();
	}
	makeUpdateShortUrl(): IUpdateShortUrl {
		return new UpdateShortUrlDummy();
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
