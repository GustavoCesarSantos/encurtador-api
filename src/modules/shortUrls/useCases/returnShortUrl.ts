import { EventNames } from '@helpers/eventNames';
import { IEventManager } from '@infra/listeners/eventManager';

export interface IReturnShortUrl {
	execute(code: string): string;
}

export class ReturnShortUrl implements IReturnShortUrl {
	private readonly eventManager: IEventManager;

	constructor(eventManager: IEventManager) {
		this.eventManager = eventManager;
	}

	execute(code: string): string {
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'ReturnShortUrl',
				what: `Iniciando criação da url encurtada, utilizando o código: ${code}`,
			},
		});
		const shortUrl = `${process.env.DOMAIN_URL}/${code}`;
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'ReturnShortUrl',
				what: `Url encurtada: ${shortUrl} criada com sucesso`,
			},
		});
		return shortUrl;
	}
}
