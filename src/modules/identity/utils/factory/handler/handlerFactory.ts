import { RegisterUser } from '@modules/identity/presentation/handlers/registerUser';
import { IUseCaseFactory } from '../useCase/IUseCaseFactory';
import { UseCaseWithPrismaFactory } from '../useCase/useCaseWithPrismaFactory';
import { SignIn } from '@modules/identity/presentation/handlers/signIn';
import { RefreshToken } from '@modules/identity/presentation/handlers/refreshToken';
import { SignOut } from '@modules/identity/presentation/handlers/signOut';

export class HandlerFactory {
	private readonly userCase: IUseCaseFactory = new UseCaseWithPrismaFactory();

	public makeRefreshToken(): RefreshToken {
		return new RefreshToken(this.userCase);
	}

	public makeRegisterUser(): RegisterUser {
		return new RegisterUser(this.userCase);
	}

	public makeSignIn(): SignIn {
		return new SignIn(this.userCase);
	}

	public makeSignOut(): SignOut {
		return new SignOut(this.userCase);
	}
}
