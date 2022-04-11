import { IShortUrlUseCaseFactory } from '@infra/factories/useCases/IShortUrlUseCaseFactory';
import { IEventManager } from '@infra/listeners/eventManager';
import { IListener } from '@infra/listeners/listener';
import { CreateShortUrl } from '@modules/shortUrls/controllers/createShortUrl';
import { IFindShortUrl } from '@modules/shortUrls/useCases/findShortUrl';
import { IGenerateCode } from '@modules/shortUrls/useCases/generateCode';
import { IIncrementHit } from '@modules/shortUrls/useCases/incrementHit';
import { IReturnShortUrl } from '@modules/shortUrls/useCases/returnShortUrl';
import { ISaveShortUrl } from '@modules/shortUrls/useCases/saveShortUrl';
import { IUpdateShortUrl } from '@modules/shortUrls/useCases/updateShortUrl';
import { IController } from '@shared/IController';

let createShortUrl: IController;

class GenerateCodeDummie implements IGenerateCode {
	execute(): string {
		return '';
	}
}

class ReturnShortUrlDummie implements IReturnShortUrl {
	execute(code: string): string {
		return '';
	}
}

class SaveShortUrlDummie implements ISaveShortUrl {
	async execute(url: string, code: string): Promise<void | Error> {
		return;
	}
}
class SaveShortUrlFakie implements ISaveShortUrl {
	async execute(url: string, code: string): Promise<void | Error> {
		return new Error();
	}
}

class UseCaseFactory implements IShortUrlUseCaseFactory {
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
		return new GenerateCodeDummie();
	}
	makeReturnShortUrl(): IReturnShortUrl {
		return new ReturnShortUrlDummie();
	}
	makeSaveShortUrl(): ISaveShortUrl {
		return new SaveShortUrlDummie();
	}
}

class UseCaseFactoryWithError implements IShortUrlUseCaseFactory {
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
		return new GenerateCodeDummie();
	}
	makeReturnShortUrl(): IReturnShortUrl {
		return new ReturnShortUrlDummie();
	}
	makeSaveShortUrl(): ISaveShortUrl {
		return new SaveShortUrlFakie();
	}
}

class EventManagerDummy implements IEventManager {
	attach(eventName: string, listeners: IListener[]): void {
		return;
	}
	notify(eventName: string, payload: any): void {
		return;
	}
}

const makeSut = () => {
	const useCaseFactory = new UseCaseFactory();
	const eventManagerDummy = new EventManagerDummy();
	return new CreateShortUrl(useCaseFactory, eventManagerDummy);
};

const makeSutWithError = () => {
	const useCaseFactory = new UseCaseFactoryWithError();
	const eventManagerDummy = new EventManagerDummy();
	return new CreateShortUrl(useCaseFactory, eventManagerDummy);
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

	test('Should return 400 when save short url use case return an error', async () => {
		const createShortUrlWithError = makeSutWithError();
		const response = await createShortUrlWithError.handle({
			body: { url: 'teste' },
		});
		expect(response.status).toBe(400);
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
