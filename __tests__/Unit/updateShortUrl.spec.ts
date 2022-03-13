import { ShortUrl } from '@/shortUrls/shortUrl';
import {
	IUpdateShortUrl,
	UpdateShortUrl,
} from '@/shortUrls/useCases/updateShortUrl';
import { BaseRepository } from 'infra/db/baseRepository';

let updateShortUrl: IUpdateShortUrl;

class ShortUrlRepositoryStub implements BaseRepository<ShortUrl> {
	save(entity: ShortUrl): Promise<void> {
		throw new Error('Method not implemented.');
	}
	findMany(): Promise<ShortUrl[]> {
		throw new Error('Method not implemented.');
	}
	findOne(identifier: string): Promise<ShortUrl | null> {
		throw new Error('Method not implemented.');
	}
	async update(identifier: string, data: any): Promise<void> {
		return;
	}
	delete(): Promise<void> {
		throw new Error('Method not implemented.');
	}
}

const makeSut = () => {
	const shortUrlRepositoryStub = new ShortUrlRepositoryStub();
	return new UpdateShortUrl(shortUrlRepositoryStub);
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
