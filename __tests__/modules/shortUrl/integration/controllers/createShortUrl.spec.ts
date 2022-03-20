import { BaseRepository } from '@infra/db/baseRepository';
import { CreateShortUrl } from '@modules/shortUrls/controllers/createShortUrl';
import { ShortUrl } from '@modules/shortUrls/shortUrl';
import { GenerateCode } from '@modules/shortUrls/useCases/generateCode';
import { ReturnShortUrl } from '@modules/shortUrls/useCases/returnShortUrl';
import { SaveShortUrl } from '@modules/shortUrls/useCases/saveShortUrl';

let createShortUrl: any;

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
	const shortUrlRepository = new ShortUrlRepositoryDummie();
	const generateCode = new GenerateCode();
	const returnShortUrl = new ReturnShortUrl();
	const saveShortUrl = new SaveShortUrl(shortUrlRepository);
	return new CreateShortUrl({ generateCode, returnShortUrl, saveShortUrl });
};

describe('Create short url', () => {
	beforeEach(() => {
		createShortUrl = makeSut();
	});

	test('Should return 201 when short url is created', async () => {
		const response = await createShortUrl.handle({
			body: { url: 'teste' },
		});
		expect(response.status).toBe(201);
	});

	test('Should return the short url', async () => {
		const response = await createShortUrl.handle({
			body: { url: 'teste' },
		});
		expect(response.body.url).not.toBeUndefined();
	});
});
