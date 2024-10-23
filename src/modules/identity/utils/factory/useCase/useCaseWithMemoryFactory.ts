import { IRepository } from '@modules/identity/external/db/IRepository';
import { IUseCaseFactory } from './IUseCaseFactory';
import { Repository } from '@modules/identity/external/db/memory/repository';
import { SaveUser } from '@modules/identity/application/useCase/saveUser';

export class UseCaseWithMemoryFactory implements IUseCaseFactory {
	private readonly repository: IRepository = new Repository();

	public makeSaveUser(): SaveUser {
		return new SaveUser(this.repository);
	}
}
