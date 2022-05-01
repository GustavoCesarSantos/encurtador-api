import { BaseRepository } from '@infra/db/baseRepository';
import { IShortUrlRepository } from '@infra/db/shortUrlRepository';
import { IEventManager } from '@infra/listeners/eventManager';
import { IListener, Payload } from '@infra/listeners/listener';
import { ShortUrl } from '@modules/shortUrls/shortUrl';
import {
	IUpdateShortUrl,
	UpdateShortUrl,
} from '@modules/shortUrls/useCases/updateShortUrl';

let updateShortUrl: IUpdateShortUrl;

class EventManagerDummy implements IEventManager {
	attach(eventName: string, listeners: IListener[]): void {
		return;
	}
	notify(payload: Payload): void {
		return;
	}
}

class ShortUrlRepositoryFakie implements IShortUrlRepository {
	getShortUrlByCode(code: string): Promise<ShortUrl | null> {
		throw new Error('Method not implemented.');
	}
	async getShortUrlOwnedByOwnerId(ownerId: number): Promise<ShortUrl[]> {
		throw new Error('Method not implemented.');
	}
	save(entity: ShortUrl): Promise<void> {
		throw new Error('Method not implemented.');
	}
	async update(uuid: string, data: object): Promise<void> {
		return;
	}
	delete(uuid: string): Promise<void> {
		throw new Error('Method not implemented.');
	}
}

const makeSut = () => {
	const shortUrlRepositoryFakie = new ShortUrlRepositoryFakie();
	const eventManagerDummy = new EventManagerDummy();
	return new UpdateShortUrl(shortUrlRepositoryFakie, eventManagerDummy);
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
