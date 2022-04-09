import { BaseRepository } from '@infra/db/baseRepository';
import { ShortUrl } from '@modules/shortUrls/shortUrl';
import {
	IUpdateShortUrl,
	UpdateShortUrl,
} from '@modules/shortUrls/useCases/updateShortUrl';

let updateShortUrl: IUpdateShortUrl;

class ShortUrlRepositoryDummie implements BaseRepository<ShortUrl> {
	save(entity: ShortUrl): Promise<void> {
		throw new Error('Method not implemented.');
	}
	findMany(): Promise<ShortUrl[]> {
		throw new Error('Method not implemented.');
	}
	findOne(identifier: string): Promise<ShortUrl | null> {
		throw new Error('Method not implemented.');
	}
	async update(identifier: string, data: object): Promise<void> {
		return;
	}
	delete(): Promise<void> {
		throw new Error('Method not implemented.');
	}
}

const makeSut = () => {
	const shortUrlRepositoryDummie = new ShortUrlRepositoryDummie();
	return new UpdateShortUrl(shortUrlRepositoryDummie);
};

describe('Update short url', () => {
	beforeEach(() => {
		updateShortUrl = makeSut();
	});

	test('Should update info of the short url', async () => {
		const uuid = '12345';
		const hits = 3;
		const data = { hits };
		expect(updateShortUrl.execute(uuid, data)).resolves.not.toThrow();
	});
});
