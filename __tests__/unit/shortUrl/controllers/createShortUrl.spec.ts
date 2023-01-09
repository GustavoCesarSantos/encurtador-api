import { IShortUrlUseCaseFactory } from '@infra/factories/useCases/IShortUrlUseCaseFactory';
import { CreateShortUrl } from '@modules/shortUrls/controllers/createShortUrl';
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

let createShortUrl: IController;

class GenerateCodeDummy implements IGenerateCode {
	execute(): string {
		return '';
	}
}

class ReturnShortUrlDummy implements IReturnShortUrl {
	execute(code: string): string {
		return '';
	}
}

class SaveShortUrlDummy implements ISaveShortUrl {
	async execute(url: string, code: string): Promise<void | Error> {
		return;
	}
}
class SaveShortUrlFakie implements ISaveShortUrl {
	async execute(url: string, code: string): Promise<void | Error> {
		return new Error();
	}
}

class UseCaseFactoryDummy implements IShortUrlUseCaseFactory {
	makeIncrementHit(): IIncrementHit {
		throw new Error('Method not implemented.');
	}
	makeFindShortUrl(): IFindShortUrl {
		throw new Error('Method not implemented.');
	}
	makeUpdateShortUrl(): IUpdateShortUrl {
		throw new Error('Method not implemented.');
	}
	makeGenerateCode(): IGenerateCode {
		return new GenerateCodeDummy();
	}
	makeReturnShortUrl(): IReturnShortUrl {
		return new ReturnShortUrlDummy();
	}
	makeSaveShortUrl(): ISaveShortUrl {
		return new SaveShortUrlDummy();
	}
}

class UseCaseFactoryWithErrorDummy implements IShortUrlUseCaseFactory {
	makeIncrementHit(): IIncrementHit {
		throw new Error('Method not implemented.');
	}
	makeFindShortUrl(): IFindShortUrl {
		throw new Error('Method not implemented.');
	}
	makeUpdateShortUrl(): IUpdateShortUrl {
		throw new Error('Method not implemented.');
	}
	makeGenerateCode(): IGenerateCode {
		return new GenerateCodeDummy();
	}
	makeReturnShortUrl(): IReturnShortUrl {
		return new ReturnShortUrlDummy();
	}
	makeSaveShortUrl(): ISaveShortUrl {
		return new SaveShortUrlFakie();
	}
}

const makeSut = () => {
	const useCaseFactoryDummy = new UseCaseFactoryDummy();
	const eventManagerDummy = new EventManagerDummy();
	const cacheDummy = new CacheDummy();
	const queueDummy = new QueueDummy();
	return new CreateShortUrl(
		useCaseFactoryDummy,
		eventManagerDummy,
		cacheDummy,
		queueDummy,
	);
};

const makeSutWithError = () => {
	const useCaseFactoryDummy = new UseCaseFactoryWithErrorDummy();
	const eventManagerDummy = new EventManagerDummy();
	const cacheDummy = new CacheDummy();
	const queueDummy = new QueueDummy();
	return new CreateShortUrl(
		useCaseFactoryDummy,
		eventManagerDummy,
		cacheDummy,
		queueDummy,
	);
};

describe('Create short url', () => {
	beforeEach(() => {
		createShortUrl = makeSut();
	});

	test('Should return 400 when url is not provided', async () => {
		const response = await createShortUrl.handle({
			body: { url: '' },
		});
		expect(response.status).toBe(400);
	});

	test('Should return a missing params error when url is not provided', async () => {
		const response = await createShortUrl.handle({
			body: { url: '' },
		});
		expect(response.body).toStrictEqual({
			message: 'Missing params: Url',
		});
	});

	test('Should return 201 when the short url is created', async () => {
		const response = await createShortUrl.handle({
			body: { url: 'teste' },
		});
		expect(response.status).toBe(201);
	});

	test('Should return the short url in response body', async () => {
		const response = await createShortUrl.handle({
			body: { url: 'teste' },
		});
		expect(response.body).not.toBeUndefined();
	});
});
