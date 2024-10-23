import { IComparePassword } from '@modules/identity/application/interface/IComparePassword';
import { ICreateAccessToken } from '@modules/identity/application/interface/ICreateAccessToken';
import { IFindUserByEmail } from '@modules/identity/application/interface/IFindUserByEmail';
import { ISaveUser } from '@modules/identity/application/interface/ISaveUser';

export interface IUseCaseFactory {
	makeComparePassword(): IComparePassword;
	makeCreateAccessToken(): ICreateAccessToken;
	makeFindUserByEmail(): IFindUserByEmail;
	makeSaveUser(): ISaveUser;
}
