import { User } from '@modules/identity/domain/user';
import { ISaveUser } from '../interface/ISaveUser';
import { IRepository } from '@modules/identity/external/db/IRepository';
import { RegisterUserInput } from '@modules/identity/presentation/dtos/registerUserInput';

export class SaveUser implements ISaveUser {
	private readonly repository: IRepository;

	constructor(repository: IRepository) {
		this.repository = repository;
	}

	async execute(data: RegisterUserInput): Promise<void | Error> {
		const userOrError = User.create(data);
		if (userOrError instanceof Error) {
			return userOrError;
		}
		userOrError.setHashPassword(userOrError.getPassword());
		await this.repository.save(userOrError);
	}
}
