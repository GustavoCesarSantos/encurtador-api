import { IShortenedUrlUseCaseFactory } from '@infra/factories/useCases/IShortenedUrlUseCaseFactory';
import { CreateShortenedUrl } from '@modules/shortenedUrls/controllers/createShortenedUrl';
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

let createShortenedUrl: IController;

class GenerateCodeDummy implements IGenerateCode {
	execute(): string {
		return '';
	}
}

class returnShortenedUrlDummy implements IReturnShortenedUrl {
	execute(code: string): string {
		return '';
	}
}

class saveShortenedUrlDummy implements ISaveShortenedUrl {
	async execute(url: string, code: string): Promise<void | Error> {
		return;
	}
}
class saveShortenedUrlFakie implements ISaveShortenedUrl {
	async execute(url: string, code: string): Promise<void | Error> {
		return new Error();
	}
}

class UseCaseFactoryDummy implements IShortenedUrlUseCaseFactory {
	makeIncrementHit(): IIncrementHit {
		throw new Error('Method not implemented.');
	}
	makeFindShortenedUrl(): IFindShortenedUrl {
		throw new Error('Method not implemented.');
	}
	makeUpdateShortenedUrl(): IUpdateShortenedUrl {
		throw new Error('Method not implemented.');
	}
	makeGenerateCode(): IGenerateCode {
		return new GenerateCodeDummy();
	}
	makeReturnShortenedUrl(): IReturnShortenedUrl {
		return new returnShortenedUrlDummy();
	}
	makeSaveShortenedUrl(): ISaveShortenedUrl {
		return new saveShortenedUrlDummy();
	}
}

class UseCaseFactoryWithErrorDummy implements IShortenedUrlUseCaseFactory {
	makeIncrementHit(): IIncrementHit {
		throw new Error('Method not implemented.');
	}
	makeFindShortenedUrl(): IFindShortenedUrl {
		throw new Error('Method not implemented.');
	}
	makeUpdateShortenedUrl(): IUpdateShortenedUrl {
		throw new Error('Method not implemented.');
	}
	makeGenerateCode(): IGenerateCode {
		return new GenerateCodeDummy();
	}
	makeReturnShortenedUrl(): IReturnShortenedUrl {
		return new returnShortenedUrlDummy();
	}
	makeSaveShortenedUrl(): ISaveShortenedUrl {
		return new saveShortenedUrlFakie();
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

const makeSutWithError = () => {
	const useCaseFactoryDummy = new UseCaseFactoryWithErrorDummy();
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

	test('Should return 400 when url is not provided', async () => {
		const response = await createShortenedUrl.handle({
			body: { url: '' },
		});
		expect(response.status).toBe(400);
	});

	test('Should return a missing params error when url is not provided', async () => {
		const response = await createShortenedUrl.handle({
			body: { url: '' },
		});
		expect(response.body).toStrictEqual({
			message: 'Missing params: Url',
		});
	});

	test('Should return 201 when the short url is created', async () => {
		const response = await createShortenedUrl.handle({
			body: { url: 'teste' },
		});
		expect(response.status).toBe(201);
	});

	test('Should return the short url in response body', async () => {
		const response = await createShortenedUrl.handle({
			body: { url: 'teste' },
		});
		expect(response.body).not.toBeUndefined();
	});
});
