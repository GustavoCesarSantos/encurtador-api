import { User } from '@modules/identity/domain/user';
import { IBaseRepository } from '@shared/db/IBaseRepository';

export interface IRepository extends IBaseRepository<User> {
	findByEmail(email: string): Promise<User | undefined>;
	incrementAuthTokenVersion(userId: number): Promise<number>;
}
