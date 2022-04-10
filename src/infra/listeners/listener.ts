export interface IListener {
	update(eventName: string, payload: string | Error): void;
}
