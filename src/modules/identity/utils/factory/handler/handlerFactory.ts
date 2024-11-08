import { RegisterUser } from '@modules/identity/presentation/handlers/registerUser';
import { IUseCaseFactory } from '../useCase/IUseCaseFactory';
import { UseCaseWithPrismaFactory } from '../useCase/useCaseWithPrismaFactory';
import { SignIn } from '@modules/identity/presentation/handlers/signIn';
import { RefreshToken } from '@modules/identity/presentation/handlers/refreshToken';
import { SignOut } from '@modules/identity/presentation/handlers/signOut';
import { PinoLogger } from '@infra/loggers/pinoLogger';
import { ILogger } from '@infra/loggers/ILogger';

export class HandlerFactory {
	private readonly logger: ILogger = PinoLogger.create();
	private readonly userCase: IUseCaseFactory = new UseCaseWithPrismaFactory();

	public makeRefreshToken(): RefreshToken {
		return new RefreshToken(this.logger, this.userCase);
	}

	public makeRegisterUser(): RegisterUser {
		return new RegisterUser(this.logger, this.userCase);
	}

	public makeSignIn(): SignIn {
		return new SignIn(this.logger, this.userCase);
	}

	public makeSignOut(): SignOut {
		return new SignOut(this.logger, this.userCase);
	}
}
