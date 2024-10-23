import { IRepository } from '@modules/identity/external/db/IRepository';
import { IUseCaseFactory } from './IUseCaseFactory';
import { Repository } from '@modules/identity/external/db/prisma/repository';
import { SaveUser } from '@modules/identity/application/useCase/saveUser';
import { ComparePassword } from '@modules/identity/application/useCase/comparePassword';
import { CreateAccessToken } from '@modules/identity/application/useCase/createAccessToken';
import { FindUserByEmail } from '@modules/identity/application/useCase/findUserByEmail';

export class UseCaseWithPrismaFactory implements IUseCaseFactory {
	private readonly repository: IRepository = new Repository();

	public makeComparePassword(): ComparePassword {
		return new ComparePassword();
	}

	public makeCreateAccessToken(): CreateAccessToken {
		return new CreateAccessToken();
	}

	public makeFindUserByEmail(): FindUserByEmail {
		return new FindUserByEmail(this.repository);
	}

	public makeSaveUser(): SaveUser {
		return new SaveUser(this.repository);
	}
}
