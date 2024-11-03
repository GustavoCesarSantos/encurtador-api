import { BugReport } from '@modules/monitor/domain/bugReport';
import { IBaseRepository } from '@shared/db/IBaseRepository';

export type IRepository = IBaseRepository<BugReport>;
