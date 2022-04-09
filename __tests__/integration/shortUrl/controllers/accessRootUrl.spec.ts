import { IShortUrlRepository } from '@infra/db/shortUrlRepository';
import { IShortUrlUseCaseFactory } from '@infra/factories/useCases/IShortUrlUseCaseFactory';
import { AccessRootUrl } from '@modules/shortUrls/controllers/accessRootUrl';
import { ShortUrl } from '@modules/shortUrls/shortUrl';
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

let accessRootUrl: IController;

class ShortUrlRepositoryDummie implements IShortUrlRepository {
	async getShortUrlByCode(code: string): Promise<ShortUrl | null> {
		const shortUrl = ShortUrl.create({ url: 'teste', code: '12345' });
		if (shortUrl instanceof Error) return null;
		return shortUrl;
	}
	getShortUrlOwnedByOwnerId(ownerId: number): Promise<ShortUrl[]> {
		throw new Error('Method not implemented.');
	}
	save(entity: ShortUrl): Promise<void> {
		throw new Error('Method not implemented.');
	}
	async update(uuid: string, data: object): Promise<void> {
		return;
	}
	delete(uuid: string): Promise<void> {
		throw new Error('Method not implemented.');
	}
}

class UseCaseFactory implements IShortUrlUseCaseFactory {
	shortUrlRepository: ShortUrlRepositoryDummie =
		new ShortUrlRepositoryDummie();

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
		return new FindShortUrl(this.shortUrlRepository);
	}
	makeIncrementHit(): IIncrementHit {
		return new IncrementHit();
	}
	makeUpdateShortUrl(): IUpdateShortUrl {
		return new UpdateShortUrl(this.shortUrlRepository);
	}
}

const makeSut = () => {
	const useCaseFactory = new UseCaseFactory();
	return new AccessRootUrl(useCaseFactory);
};

describe('Create short url', () => {
	beforeEach(() => {
		accessRootUrl = makeSut();
	});

	test('Should return 302 when short url is created', async () => {
		const response = await accessRootUrl.handle({
			params: { code: 'teste' },
		});
		expect(response.status).toBe(302);
	});

	test('Should return root url when this can be redirect', async () => {
		const response = await accessRootUrl.handle({
			params: { code: 'success' },
		});
		expect(response.body).toStrictEqual({ rootUrl: 'teste' });
	});
});
