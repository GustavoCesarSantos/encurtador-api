import { RegisterUser } from '@modules/identity/presentation/handlers/registerUser';
import { IUseCaseFactory } from '../useCase/IUseCaseFactory';
import { UseCaseWithPrismaFactory } from '../useCase/useCaseWithPrismaFactory';

export class HandlerFactory {
	private readonly userCase: IUseCaseFactory = new UseCaseWithPrismaFactory();

	public makeRegisterUser(): RegisterUser {
		return new RegisterUser(this.userCase);
	}
}
