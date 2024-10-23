import { IRepository } from '@modules/shortenedUrls/external/db/IRepository';
import { IIncrementAccessCounter } from '../interface/IIncrementAccessCounter';

export class IncrementAccessCounter implements IIncrementAccessCounter {
	private readonly repository: IRepository;

	constructor(repository: IRepository) {
		this.repository = repository;
	}

	async execute(code: string): Promise<void> {
		await this.repository.incrementAccess(code);
	}
}
