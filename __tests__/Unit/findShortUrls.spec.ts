import { ShortUrl } from '@/shortUrls/shortUrl';
import { FindShortUrls } from '@/shortUrls/useCases/findShortUrls';
import { BaseRepository } from 'infra/db/baseRepository';

let findShortUrls: FindShortUrls;

class ShortUrlRepositoryStub implements BaseRepository<ShortUrl> {
	save(entity: ShortUrl): Promise<void> {
		throw new Error('Method not implemented.');
	}
	async findMany(): Promise<ShortUrl[]> {
		const shortUrl = new ShortUrl({ code: '12345', url: 'teste' });
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
	const shortUrlRepositoryStub = new ShortUrlRepositoryStub();
	return new FindShortUrls(shortUrlRepositoryStub);
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
