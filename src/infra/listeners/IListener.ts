export type Payload = {
	eventName: string;
	message: {
		where: string;
		what: string;
	};
};

export interface IListener {
	update(payload: Payload): void;
}
