import { BaseRepository } from '@infra/db/baseRepository';
import { AccessRootUrl } from '@modules/shortUrls/controllers/accessRootUrl';
import { ShortUrl } from '@modules/shortUrls/shortUrl';
import { FindShortUrl } from '@modules/shortUrls/useCases/findShortUrl';
import { IncrementHit } from '@modules/shortUrls/useCases/incrementHit';
import { UpdateShortUrl } from '@modules/shortUrls/useCases/updateShortUrl';
import { IController } from '@shared/IController';

let accessRootUrl: IController;

class ShortUrlRepositoryDummie implements BaseRepository<ShortUrl> {
	save(entity: ShortUrl): Promise<void> {
		throw new Error('Method not implemented.');
	}
	findMany(): Promise<ShortUrl[]> {
		throw new Error('Method not implemented.');
	}
	async findOne(identifier: string): Promise<ShortUrl | null> {
		const shortUrl = ShortUrl.create({ url: 'teste', code: '12345' });
		if (shortUrl instanceof Error) return null;
		return shortUrl;
	}
	async update(identifier: string, data: object): Promise<void> {
		return;
	}
	delete(uuid: string): Promise<void> {
		throw new Error('Method not implemented.');
	}
}

const makeSut = () => {
	const shortUrlRepository = new ShortUrlRepositoryDummie();
	const findShortUrl = new FindShortUrl(shortUrlRepository);
	const incrementHit = new IncrementHit();
	const updateShortUrl = new UpdateShortUrl(shortUrlRepository);
	return new AccessRootUrl({ updateShortUrl, incrementHit, findShortUrl });
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
