import { EventNames } from '@helpers/eventNames';
import { IShortenedUrlRepository } from '@infra/db/shortenedUrlRepository';
import { IEventManager } from '@infra/listeners/eventManager';

export interface IUpdateShortenedUrl {
	execute(identifier: string, data: object): Promise<void>;
}

export class UpdateShortenedUrl implements IUpdateShortenedUrl {
	private readonly shortenedUrlRepository: IShortenedUrlRepository;
	private readonly eventManager: IEventManager;

	constructor(
		shortenedUrlRepository: IShortenedUrlRepository,
		eventManager: IEventManager,
	) {
		this.shortenedUrlRepository = shortenedUrlRepository;
		this.eventManager = eventManager;
	}

	async execute(identifier: string, data: object): Promise<void> {
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'UpdateShortenedUrl',
				what: `Iniciando atualização do schema da url encurtada: ${identifier}, 
				informações para atualizar: ${JSON.stringify(data)}`,
			},
		});
		await this.shortenedUrlRepository.update(identifier, data);
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'UpdateShortenedUrl',
				what: `Schema da url encurtada: ${identifier} atualizado, 
				informações utilizada para atualizar: ${JSON.stringify(data)}`,
			},
		});
	}
}
