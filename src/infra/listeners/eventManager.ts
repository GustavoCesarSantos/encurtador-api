import { IListener, Payload } from './IListener';

export interface IEventManager {
	attach(eventName: string, listeners: IListener[]): void;
	notify(payload: Payload): void;
}

export class ListenersManager implements IEventManager {
	private listeners: { [x: string]: IListener[] } = {};

	public attach(eventName: string, listeners: IListener[]): void {
		if (!this.listeners[eventName]) this.listeners[eventName] = [];
		this.listeners[eventName].push(...listeners);
	}

	public notify(payload: Payload): void {
		this.listeners[payload.eventName].forEach((listener: IListener) => {
			listener.update(payload);
		});
	}
}
