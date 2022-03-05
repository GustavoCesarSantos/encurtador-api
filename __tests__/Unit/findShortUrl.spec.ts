import { ShortUrl } from '@/shortUrls/shortUrl';
import { FindShortUrl } from '@/shortUrls/useCases/findShortUrl';
import { BaseRepository } from 'infra/db/baseRepository';

let findShortUrl: FindShortUrl;

class ShortUrlRepositoryFakie implements BaseRepository<ShortUrl> {
	save(entity: ShortUrl): Promise<void> {
		throw new Error('Method not implemented.');
	}
	findMany(): Promise<ShortUrl[]> {
		throw new Error('Method not implemented.');
	}
	async findOne(identifier: string): Promise<ShortUrl> {
		return new ShortUrl({ code: '12345', url: 'teste' });
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
	return new FindShortUrl(shortUrlRepositoryFakie);
};

describe('Find short url', () => {
	beforeEach(() => {
		findShortUrl = makeSut();
	});

	test('Should return a short url array when the short url is found', async () => {
		const code = '12345';
		const result = await findShortUrl.execute(code);
		expect(Array.isArray(result)).toBe(true);
	});
});

// caso não ache, deve retornar array vazio
// caso ache, deve retornar entidade
