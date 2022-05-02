import { EventNames } from '@helpers/eventNames';
import { IShortUrlRepository } from '@infra/db/shortUrlRepository';
import { IEventManager } from '@infra/listeners/eventManager';

export interface IUpdateShortUrl {
	execute(identifier: string, data: object): Promise<void>;
}

export class UpdateShortUrl implements IUpdateShortUrl {
	private readonly shortUrlRepository: IShortUrlRepository;
	private readonly eventManager: IEventManager;

	constructor(
		shortUrlRepository: IShortUrlRepository,
		eventManager: IEventManager,
	) {
		this.shortUrlRepository = shortUrlRepository;
		this.eventManager = eventManager;
	}

	async execute(identifier: string, data: object): Promise<void> {
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'UpdateShortUrl',
				what: `Iniciando atualização do schema da url encurtada: ${identifier}, 
				informações para atualizar: ${JSON.stringify(data)}`,
			},
		});
		await this.shortUrlRepository.update(identifier, data);
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'UpdateShortUrl',
				what: `Schema da url encurtada: ${identifier} atualizado, 
				informações utilizada para atualizar: ${JSON.stringify(data)}`,
			},
		});
	}
}
