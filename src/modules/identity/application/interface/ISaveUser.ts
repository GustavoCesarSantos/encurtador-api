import { RegisterUserInput } from '@modules/identity/presentation/dtos/registerUserInput';

export interface ISaveUser {
	execute(data: RegisterUserInput): Promise<void | Error>;
}
