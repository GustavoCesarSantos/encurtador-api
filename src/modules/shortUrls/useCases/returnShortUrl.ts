import { EventNames } from '@helpers/eventNames';
import { IEventManager } from '@infra/listeners/eventManager';
import { variables } from '@helpers/envs';

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
		const shortUrl = `${variables.domainUrl}/${code}`;
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
