import { IListener } from './listener';

export interface IEventManager {
	attach(eventName: string, listeners: IListener[]): void;
	notify(eventName: string, payload: any): void;
}

export class ListenersManager implements IEventManager {
	private listeners: { [x: string]: IListener[] } = {};

	public attach(eventName: string, listeners: IListener[]): void {
		if (!this.listeners[eventName]) this.listeners[eventName] = [];
		this.listeners[eventName].push(...listeners);
	}

	public notify(eventName: string, payload: any): void {
		this.listeners[eventName].forEach((listener: IListener) => {
			listener.update({ eventName, message: payload });
		});
	}
}
