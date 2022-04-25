import { ShortUrlRepositoryWithMemory } from '@infra/db/memory/shortUrlRepositoryWithMemory';
import { IEventManager } from '@infra/listeners/eventManager';
import { IListener, Payload } from '@infra/listeners/listener';
import { SaveShortUrl } from '@modules/shortUrls/useCases/saveShortUrl';

const shortUrlRepository = new ShortUrlRepositoryWithMemory();

class EventManagerDummy implements IEventManager {
	attach(eventName: string, listeners: IListener[]): void {
		return;
	}
	notify(payload: Payload): void {
		return;
	}
}

const makeSut = () => {
	const eventManagerDummy = new EventManagerDummy();
	return new SaveShortUrl(shortUrlRepository, eventManagerDummy);
};

describe('Save short url', () => {
	test('Should save short url', async () => {
		const saveShortUrl = makeSut();
		const url = 'teste';
		const code = '12345';
		saveShortUrl.execute(url, code);
		const result = await shortUrlRepository.getShortUrlByCode(code);
		expect(result?.getCode()).toBe(code);
	});
});
