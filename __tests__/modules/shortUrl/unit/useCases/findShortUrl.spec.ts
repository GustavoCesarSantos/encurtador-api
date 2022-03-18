import { BaseRepository } from '@infra/db/baseRepository';
import { ShortUrl } from '@modules/shortUrls/shortUrl';
import { FindShortUrl } from '@modules/shortUrls/useCases/findShortUrl';

let findShortUrl: FindShortUrl;
const codeStub = {
	default: 'test',
	success: 'success',
};

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

	test('Should return an array', async () => {
		const result = await findShortUrl.execute(codeStub.default);
		expect(Array.isArray(result)).toBe(true);
	});

	test('Should return an empty array when the short url is not found', async () => {
		const result = await findShortUrl.execute(codeStub.default);
		expect(result).toHaveLength(0);
	});

	test('Should return a short url array when the short url is found', async () => {
		const result = await findShortUrl.execute(codeStub.success);
		expect(result).toHaveLength(1);
		expect(result[0] instanceof ShortUrl).toBe(true);
	});
});
