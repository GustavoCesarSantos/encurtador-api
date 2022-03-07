import { ShortUrl } from '@/shortUrls/shortUrl';
import { IncrementHit } from '@/shortUrls/useCases/incrementHit';
import { BaseRepository } from 'infra/db/baseRepository';

let incrementHit: IncrementHit;

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
	async update(uuid: string, data: object): Promise<void> {
		return;
	}
	delete(): Promise<void> {
		throw new Error('Method not implemented.');
	}
}

const makeSut = () => {
	const shortUrlRepositoryDummie = new ShortUrlRepositoryDummie();
	return new IncrementHit(shortUrlRepositoryDummie);
};

describe('Increment hit', () => {
	beforeEach(() => {
		incrementHit = makeSut();
	});

	test('Should increment hit property', async () => {
		const uuid = '1';
		const hit = 0;
		expect(incrementHit.execute(uuid, hit)).resolves.not.toThrow();
	});
});
