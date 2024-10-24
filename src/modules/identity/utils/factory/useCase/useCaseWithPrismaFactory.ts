import { IRepository } from '@modules/identity/external/db/IRepository';
import { IUseCaseFactory } from './IUseCaseFactory';
import { Repository } from '@modules/identity/external/db/prisma/repository';
import { SaveUser } from '@modules/identity/application/useCase/saveUser';
import { ComparePassword } from '@modules/identity/application/useCase/comparePassword';
import { CreateAccessToken } from '@modules/identity/application/useCase/createAccessToken';
import { FindUserByEmail } from '@modules/identity/application/useCase/findUserByEmail';
import { CreateRefreshToken } from '@modules/identity/application/useCase/createRefreshToken';
import { DecodeRefreshToken } from '@modules/identity/application/useCase/decodeRefreshToken';
import { IncrementAuthTokenVersion } from '@modules/identity/application/useCase/incrementAuthTokenVersion';

export class UseCaseWithPrismaFactory implements IUseCaseFactory {
	private readonly repository: IRepository = new Repository();

	public makeComparePassword(): ComparePassword {
		return new ComparePassword();
	}

	public makeCreateAccessToken(): CreateAccessToken {
		return new CreateAccessToken();
	}

	public makeCreateRefreshToken(): CreateRefreshToken {
		return new CreateRefreshToken();
	}

	public makeDecodeRefreshToken(): DecodeRefreshToken {
		return new DecodeRefreshToken();
	}

	public makeFindUserByEmail(): FindUserByEmail {
		return new FindUserByEmail(this.repository);
	}

	public makeIncrementAuthTokenVersion(): IncrementAuthTokenVersion {
		return new IncrementAuthTokenVersion(this.repository);
	}

	public makeSaveUser(): SaveUser {
		return new SaveUser(this.repository);
	}
}
