import { User } from '@modules/identity/domain/user';

export interface ICreateAccessToken {
	execute(user: User): Promise<{ accessToken: string }>;
}
