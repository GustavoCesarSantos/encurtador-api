import { ShortUrlRepositoryWithMemory } from '@infra/db/memory/shortUrlRepositoryWithMemory';
import { IEventManager } from '@infra/listeners/eventManager';
import { IListener, Payload } from '@infra/listeners/listener';
import { ShortUrl } from '@modules/shortUrls/shortUrl';
import { FindShortUrl } from '@modules/shortUrls/useCases/findShortUrl';

class EventManagerDummy implements IEventManager {
	attach(eventName: string, listeners: IListener[]): void {
		return;
	}
	notify(payload: Payload): void {
		return;
	}
}

const makeSut = () => {
	const shortUrlRepository = new ShortUrlRepositoryWithMemory();
	const eventManagerDummy = new EventManagerDummy();
	return new FindShortUrl(shortUrlRepository, eventManagerDummy);
};

describe('Find short url', () => {
	test('Should return null when the short url schema is not found', async () => {
		const code = 'fail';
		const findShortUrl = makeSut();
		const result = await findShortUrl.execute(code);
		expect(result).toBeNull();
	});

	test('Should return the short url schema found', async () => {
		const code = 'success';
		const findShortUrl = makeSut();
		const result = await findShortUrl.execute(code);
		expect(result instanceof ShortUrl).toBe(true);
	});
});
