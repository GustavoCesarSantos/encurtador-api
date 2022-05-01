import { IEventManager } from '@infra/listeners/eventManager';
import { IListener, Payload } from '@infra/listeners/listener';
import {
	IIncrementHit,
	IncrementHit,
} from '@modules/shortUrls/useCases/incrementHit';

let incrementHit: IIncrementHit;

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
	return new IncrementHit(eventManagerDummy);
};

describe('Increment hit', () => {
	beforeEach(() => {
		incrementHit = makeSut();
	});

	test('Should increment hit property', async () => {
		const hit = 2;
		const result = incrementHit.execute(hit);
		expect(result).toBe(3);
	});
});
