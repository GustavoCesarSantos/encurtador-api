import { BaseRepository } from '@infra/db/baseRepository';
import { ShortUrl } from '@modules/shortUrls/shortUrl';
import { FindShortUrl } from '@modules/shortUrls/useCases/findShortUrl';

let findShortUrl: FindShortUrl;

class ShortUrlRepositoryStub implements BaseRepository<ShortUrl> {
	save(entity: ShortUrl): Promise<void> {
		throw new Error('Method not implemented.');
	}
	findMany(): Promise<ShortUrl[]> {
		throw new Error('Method not implemented.');
	}
	async findOne(identifier: string): Promise<ShortUrl | null> {
		if (identifier === 'success') {
			const shortUrl = ShortUrl.create({ url: 'teste', code: '12345' });
			if (shortUrl instanceof Error) return null;
			return shortUrl;
		}
		return null;
	}
	update(): Promise<void> {
		throw new Error('Method not implemented.');
	}
	delete(): Promise<void> {
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
