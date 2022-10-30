import { IEventManager } from '@infra/listeners/eventManager';
import { IListener, Payload } from '@infra/listeners/IListener';

export class EventManagerDummy implements IEventManager {
	attach(eventName: string, listeners: IListener[]): void {
		return;
	}
	notify(payload: Payload): void {
		return;
	}
}
