import { IShortUrlRepository } from '@infra/db/shortUrlRepository';
import { ShortUrl } from '@modules/shortUrls/shortUrl';
import { FindShortUrls } from '@modules/shortUrls/useCases/findShortUrls';

let findShortUrls: FindShortUrls;

class ShortUrlRepositoryFakie implements IShortUrlRepository {
	getShortUrlByCode(code: string): Promise<ShortUrl | null> {
		throw new Error('Method not implemented.');
	}
	async getShortUrlOwnedByOwnerId(ownerId: number): Promise<ShortUrl[]> {
		const shortUrl = ShortUrl.create({ url: 'teste', code: '12345' });
		if (shortUrl instanceof Error) return [];
		return [shortUrl];
	}
	save(entity: ShortUrl): Promise<void> {
		throw new Error('Method not implemented.');
	}
	update(uuid: string, data: object): Promise<void> {
		throw new Error('Method not implemented.');
	}
	delete(uuid: string): Promise<void> {
		throw new Error('Method not implemented.');
	}
}

const makeSut = () => {
	const shortUrlRepositoryFakie = new ShortUrlRepositoryFakie();
	return new FindShortUrls(shortUrlRepositoryFakie);
};

describe('Find short urls', () => {
	beforeEach(() => {
		findShortUrls = makeSut();
	});

	test('Should return an array', async () => {
		const ownerId = 1;
		const result = await findShortUrls.execute(ownerId);
		expect(Array.isArray(result)).toBe(true);
	});
});
