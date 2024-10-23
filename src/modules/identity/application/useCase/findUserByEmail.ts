import { User } from '@modules/identity/domain/user';
import { IRepository } from '@modules/identity/external/db/IRepository';
import { IFindUserByEmail } from '../interface/IFindUserByEmail';

export class FindUserByEmail implements IFindUserByEmail {
	private readonly repository: IRepository;

	constructor(repository: IRepository) {
		this.repository = repository;
	}

	async execute(email: string): Promise<User | undefined> {
		return await this.repository.findByEmail(email);
	}
}
