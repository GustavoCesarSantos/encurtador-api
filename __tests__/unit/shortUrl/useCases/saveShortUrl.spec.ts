import { MissingParams } from '@helpers/errors/missingParams';
import { IShortUrlRepository } from '@infra/db/shortUrlRepository';
import { ShortUrl } from '@modules/shortUrls/shortUrl';
import {
	ISaveShortUrl,
	SaveShortUrl,
} from '@modules/shortUrls/useCases/saveShortUrl';

let saveShortUrl: ISaveShortUrl;

class ShortUrlRepositoryDummie implements IShortUrlRepository {
	getShortUrlOwnedByOwnerId(ownerId: number): Promise<ShortUrl[]> {
		throw new Error('Method not implemented.');
	}
	getShortUrlByCode(code: string): Promise<ShortUrl | null> {
		throw new Error('Method not implemented.');
	}
	async save(entity: ShortUrl): Promise<void> {
		return;
	}
	update(uuid: string, data: object): Promise<void> {
		throw new Error('Method not implemented.');
	}
	delete(uuid: string): Promise<void> {
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
