import { IShortUrlRepository } from '@infra/db/shortUrlRepository';
import { IShortUrlUseCaseFactory } from '@infra/factories/useCases/IShortUrlUseCaseFactory';
import { IEventManager } from '@infra/listeners/eventManager';
import { IListener, Payload } from '@infra/listeners/listener';
import { CreateShortUrl } from '@modules/shortUrls/controllers/createShortUrl';
import { ShortUrl } from '@modules/shortUrls/shortUrl';
import { IFindShortUrl } from '@modules/shortUrls/useCases/findShortUrl';
import {
	GenerateCode,
	IGenerateCode,
} from '@modules/shortUrls/useCases/generateCode';
import { IIncrementHit } from '@modules/shortUrls/useCases/incrementHit';
import {
	IReturnShortUrl,
	ReturnShortUrl,
} from '@modules/shortUrls/useCases/returnShortUrl';
import {
	ISaveShortUrl,
	SaveShortUrl,
} from '@modules/shortUrls/useCases/saveShortUrl';
import { IUpdateShortUrl } from '@modules/shortUrls/useCases/updateShortUrl';
import { IController } from '@shared/IController';

let createShortUrl: IController;

class ShortUrlRepositoryDummie implements IShortUrlRepository {
	getShortUrlByCode(code: string): Promise<ShortUrl | null> {
		throw new Error('Method not implemented.');
	}
	getShortUrlOwnedByOwnerId(ownerId: number): Promise<ShortUrl[]> {
		throw new Error('Method not implemented.');
	}
	async save(entity: ShortUrl): Promise<void> {
		return;
	}
	update(uuid: string, data: object): Promise<void> {
		throw new Error('Method not implemented.');
	}
	delete(uuid: string): Promise<void> {
		throw new Error('Method not implemented.');
	}
}

class UseCaseFactory implements IShortUrlUseCaseFactory {
	shortUrlRepository: ShortUrlRepositoryDummie =
		new ShortUrlRepositoryDummie();

	makeGenerateCode(): IGenerateCode {
		return new GenerateCode();
	}
	makeReturnShortUrl(): IReturnShortUrl {
		return new ReturnShortUrl();
	}
	makeSaveShortUrl(): ISaveShortUrl {
		return new SaveShortUrl(this.shortUrlRepository);
	}
	makeFindShortUrl(): IFindShortUrl {
		throw new Error('Method not implemented.');
	}
	makeIncrementHit(): IIncrementHit {
		throw new Error('Method not implemented.');
	}
	makeUpdateShortUrl(): IUpdateShortUrl {
		throw new Error('Method not implemented.');
	}
}

class EventManagerDummy implements IEventManager {
	attach(eventName: string, listeners: IListener[]): void {
		return;
	}
	notify(payload: Payload): void {
		return;
	}
}

const makeSut = () => {
	const useCaseFactory = new UseCaseFactory();
	const eventManagerDummy = new EventManagerDummy();
	return new CreateShortUrl(useCaseFactory, eventManagerDummy);
};

describe('Create short url', () => {
	beforeEach(() => {
		createShortUrl = makeSut();
	});

	test('Should return 201 when short url is created', async () => {
		const response = await createShortUrl.handle({
			body: { url: 'teste' },
		});
		expect(response.status).toBe(201);
	});

	test('Should return the short url', async () => {
		const response = await createShortUrl.handle({
			body: { url: 'teste' },
		});
		expect(response.body).not.toBeUndefined();
	});
});
