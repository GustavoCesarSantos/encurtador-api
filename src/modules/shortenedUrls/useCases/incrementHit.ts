import { EventNames } from '@helpers/eventNames';
import { IEventManager } from '@infra/listeners/eventManager';

export interface IIncrementHit {
	execute(hit: number): number;
}

export class IncrementHit implements IIncrementHit {
	private readonly eventManager: IEventManager;

	constructor(eventManager: IEventManager) {
		this.eventManager = eventManager;
	}

	execute(hit: number): number {
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'IncrementHit',
				what: `Iniciando incremento da propriedade hit, valor atual: ${hit}`,
			},
		});
		const newValue = hit + 1;
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'IncrementHit',
				what: `Propriedade hit incrementada, valor atual: ${newValue}`,
			},
		});
		return newValue;
	}
}
