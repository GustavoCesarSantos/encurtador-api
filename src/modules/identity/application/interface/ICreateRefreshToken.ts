import { User } from '@modules/identity/domain/user';

export interface ICreateRefreshToken {
	execute(user: User): Promise<{ refreshToken: string }>;
}
