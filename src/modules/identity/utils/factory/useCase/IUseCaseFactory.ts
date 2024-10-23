import { ISaveUser } from '@modules/identity/application/interface/ISaveUser';

export interface IUseCaseFactory {
	makeSaveUser(): ISaveUser;
}
