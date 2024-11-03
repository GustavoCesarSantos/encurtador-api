import { User } from '@modules/identity/domain/user';

export interface IFindUserByEmail {
	execute(email: string): Promise<User | undefined>;
}
