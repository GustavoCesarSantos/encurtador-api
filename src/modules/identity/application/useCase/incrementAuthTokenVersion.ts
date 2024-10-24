import { IRepository } from '@modules/identity/external/db/IRepository';
import { IIncrementAuthTokenVersion } from '../interface/IIncrementAuthTokenVersion';

export class IncrementAuthTokenVersion implements IIncrementAuthTokenVersion {
	private readonly repository: IRepository;

	constructor(repository: IRepository) {
		this.repository = repository;
	}

	async execute(userId: number): Promise<void> {
		await this.repository.incrementAuthTokenVersion(userId);
	}
}
