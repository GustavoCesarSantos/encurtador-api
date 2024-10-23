import { IRepository } from '@modules/identity/external/db/IRepository';
import { IUseCaseFactory } from './IUseCaseFactory';
import { Repository } from '@modules/identity/external/db/prisma/repository';
import { SaveUser } from '@modules/identity/application/useCase/saveUser';

export class UseCaseWithPrismaFactory implements IUseCaseFactory {
	private readonly repository: IRepository = new Repository();

	public makeSaveUser(): SaveUser {
		return new SaveUser(this.repository);
	}
}
