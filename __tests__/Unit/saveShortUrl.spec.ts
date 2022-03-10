import { ShortUrl } from '@/shortUrls/shortUrl';
import { ISaveShortUrl, SaveShortUrl } from '@/shortUrls/useCases/saveShortUrl';
import { MissingParams } from '../../src/helpers/errors/missingParams';
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

	test('Should return an error when the url is not passed', async () => {
		const url = '';
		const code = '12345';
		const result = await saveShortUrl.execute(url, code);
		expect(result).toEqual(new MissingParams('root url'));
	});

	test('Should return an error when the code is not passed', async () => {
		const url = 'teste';
		const code = '';
		const result = await saveShortUrl.execute(url, code);
		expect(result).toEqual(new MissingParams('code'));
	});

	test('Should save short url schema', () => {
		const url = 'http://teste.com.br';
		const code = '12345';
		expect(() => saveShortUrl.execute(url, code)).not.toThrow();
	});
});
