import { ShortUrl } from '@/shortUrls/shortUrl';
import { ISaveShortUrl, SaveShortUrl } from '@/shortUrls/useCases/saveShortUrl';
import { BaseRepository } from 'infra/db/baseRepository';

let saveShortUrl: ISaveShortUrl;

class ShortUrlRepositoryDummie implements BaseRepository<ShortUrl> {
	async save(entity: ShortUrl): Promise<void> {
		return;
	}
	findMany(): Promise<ShortUrl[]> {
		throw new Error('Method not implemented.');
	}
	findOne(): Promise<ShortUrl> {
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
	const shortUrlRepositoryDummie = new ShortUrlRepositoryDummie();
	return new SaveShortUrl(shortUrlRepositoryDummie);
};

describe('Save short url', () => {
	beforeEach(() => {
		saveShortUrl = makeSut();
	});

	test('Should save short url schema', () => {
		const url = 'http://teste.com.br';
		const code = '12345';
		expect(() => saveShortUrl.execute(url, code)).not.toThrow();
	});
});
