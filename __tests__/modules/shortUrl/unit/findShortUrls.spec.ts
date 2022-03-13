import { ShortUrl } from '@/shortUrls/shortUrl';
import { FindShortUrls } from '@/shortUrls/useCases/findShortUrls';
import { BaseRepository } from 'infra/db/baseRepository';

let findShortUrls: FindShortUrls;

class ShortUrlRepositoryFakie implements BaseRepository<ShortUrl> {
	save(entity: ShortUrl): Promise<void> {
		throw new Error('Method not implemented.');
	}
	async findMany(): Promise<ShortUrl[]> {
		const shortUrl = ShortUrl.create({ url: 'teste', code: '12345' });
		if (shortUrl instanceof Error) return [];
		return [shortUrl];
	}
	async findOne(identifier: string): Promise<ShortUrl | null> {
		throw new Error('Method not implemented.');
	}
	update(): Promise<void> {
		throw new Error('Method not implemented.');
	}
	delete(): Promise<void> {
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
		const result = await findShortUrls.execute();
		expect(Array.isArray(result)).toBe(true);
	});
});
