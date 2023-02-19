import { EventNames } from '@helpers/eventNames';
import { IEventManager } from '@infra/listeners/eventManager';
import { variables } from '@helpers/envs';

export interface IReturnShortenedUrl {
	execute(code: string): string;
}

export class ReturnShortenedUrl implements IReturnShortenedUrl {
	private readonly eventManager: IEventManager;

	constructor(eventManager: IEventManager) {
		this.eventManager = eventManager;
	}

	execute(code: string): string {
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'ReturnShortenedUrl',
				what: `Iniciando criação da url encurtada, utilizando o código: ${code}`,
			},
		});
		const shortenedUrl = `${variables.domainUrl}/${code}`;
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'ReturnShortenedUrl',
				what: `Url encurtada: ${shortenedUrl} criada com sucesso`,
			},
		});
		return shortenedUrl;
	}
}
