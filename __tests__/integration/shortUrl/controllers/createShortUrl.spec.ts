import { IShortUrlUseCaseFactory } from '@infra/factories/useCases/IShortUrlUseCaseFactory';
import { CreateShortUrl } from '@modules/shortUrls/controllers/createShortUrl';
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
import { EventManagerDummy } from '../../../testDoubles/dummy/eventManager';
import { ShortUrlRepositoryDummy } from '../../../testDoubles/dummy/shortUrlRepository';

let createShortUrl: IController;

class UseCaseFactoryDummy implements IShortUrlUseCaseFactory {
	eventManagerDummy = new EventManagerDummy();
	shortUrlRepository: ShortUrlRepositoryDummy = new ShortUrlRepositoryDummy();

	makeGenerateCode(): IGenerateCode {
		return new GenerateCode(this.eventManagerDummy);
	}
	makeReturnShortUrl(): IReturnShortUrl {
		return new ReturnShortUrl(this.eventManagerDummy);
	}
	makeSaveShortUrl(): ISaveShortUrl {
		return new SaveShortUrl(
			this.shortUrlRepository,
			this.eventManagerDummy,
		);
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

const makeSut = () => {
	const useCaseFactoryDummy = new UseCaseFactoryDummy();
	const eventManagerDummy = new EventManagerDummy();
	return new CreateShortUrl(useCaseFactoryDummy, eventManagerDummy);
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
