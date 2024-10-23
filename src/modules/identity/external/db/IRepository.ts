import { User } from '@modules/identity/domain/user';
import { IBaseRepository } from '@shared/db/IBaseRepository';

export type IRepository = IBaseRepository<User>;
