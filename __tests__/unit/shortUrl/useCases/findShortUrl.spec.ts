import { IShortUrlRepository } from '@infra/db/shortUrlRepository';
import { ShortUrl } from '@modules/shortUrls/shortUrl';
import { FindShortUrl } from '@modules/shortUrls/useCases/findShortUrl';

let findShortUrl: FindShortUrl;

class ShortUrlRepositoryStub implements IShortUrlRepository {
	getShortUrlOwnedByOwnerId(ownerId: number): Promise<ShortUrl[]> {
		throw new Error('Method not implemented.');
	}
	async getShortUrlByCode(code: string): Promise<ShortUrl | null> {
		if (code === 'success') {
			const shortUrl = ShortUrl.create({ url: 'teste', code: '12345' });
			if (shortUrl instanceof Error) return null;
			return shortUrl;
		}
		return null;
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
	const shortUrlRepositoryStub = new ShortUrlRepositoryStub();
	return new FindShortUrl(shortUrlRepositoryStub);
};

describe('Find short url', () => {
	beforeEach(() => {
		findShortUrl = makeSut();
	});

	test('Should return null when the short url schema is not found', async () => {
		const result = await findShortUrl.execute('fail');
		expect(result).toBeNull();
	});

	test('Should the short url schema found', async () => {
		const result = await findShortUrl.execute('success');
		expect(result instanceof ShortUrl).toBe(true);
	});
});
