import { ShortUrl } from '@/shortUrls/shortUrl';
import { DeleteShortUrl } from '@/shortUrls/useCases/deleteShortUrl';
import { BaseRepository } from 'infra/db/baseRepository';

let deleteShortUrl: DeleteShortUrl;

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
	update(): Promise<void> {
		throw new Error('Method not implemented.');
	}
	async delete(uuid: string): Promise<void> {
		return;
	}
}

const makeSut = () => {
	const shortUrlRepositoryDummie = new ShortUrlRepositoryDummie();
	return new DeleteShortUrl(shortUrlRepositoryDummie);
};

describe('Delete short url', () => {
	beforeEach(() => {
		deleteShortUrl = makeSut();
	});

	test('Should delete the short url', async () => {
		const uuid = '1';
		expect(deleteShortUrl.execute(uuid)).resolves.not.toThrow();
	});
});
