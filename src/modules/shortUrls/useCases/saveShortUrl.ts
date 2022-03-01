export interface ISaveShortUrl {
	execute(): Promise<void>;
}

export class SaveShortUrl implements ISaveShortUrl {
	async execute(): Promise<void> {
		return;
	}
}
