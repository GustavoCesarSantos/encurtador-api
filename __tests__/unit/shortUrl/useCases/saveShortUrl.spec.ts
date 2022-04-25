import { MissingParams } from '@helpers/errors/missingParams';
import { IShortUrlRepository } from '@infra/db/shortUrlRepository';
import { IEventManager } from '@infra/listeners/eventManager';
import { IListener, Payload } from '@infra/listeners/listener';
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

class EventManagerDummy implements IEventManager {
	attach(eventName: string, listeners: IListener[]): void {
		return;
	}
	notify(payload: Payload): void {
		return;
	}
}

const makeSut = () => {
	const shortUrlRepositoryDummie = new ShortUrlRepositoryDummie();
	const eventManagerDummy = new EventManagerDummy();
	return new SaveShortUrl(shortUrlRepositoryDummie, eventManagerDummy);
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
