import { IComparePassword } from '@modules/identity/application/interface/IComparePassword';
import { ICreateAccessToken } from '@modules/identity/application/interface/ICreateAccessToken';
import { ICreateRefreshToken } from '@modules/identity/application/interface/ICreateRefreshToken';
import { IDecodeRefreshToken } from '@modules/identity/application/interface/IDecodeRefreshToken';
import { IFindUserByEmail } from '@modules/identity/application/interface/IFindUserByEmail';
import { IIncrementAuthTokenVersion } from '@modules/identity/application/interface/IIncrementAuthTokenVersion';
import { ISaveUser } from '@modules/identity/application/interface/ISaveUser';

export interface IUseCaseFactory {
	makeComparePassword(): IComparePassword;
	makeCreateAccessToken(): ICreateAccessToken;
	makeCreateRefreshToken(): ICreateRefreshToken;
	makeDecodeRefreshToken(): IDecodeRefreshToken;
	makeFindUserByEmail(): IFindUserByEmail;
	makeIncrementAuthTokenVersion(): IIncrementAuthTokenVersion;
	makeSaveUser(): ISaveUser;
}
