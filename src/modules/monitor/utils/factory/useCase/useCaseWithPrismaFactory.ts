import { IUseCaseFactory } from './IUseCaseFactory';
import { SaveBugReport } from '@modules/monitor/application/useCase/saveBugReport';
import { IRepository } from '@modules/monitor/external/db/IRepository';
import { Repository } from '@modules/monitor/external/db/prisma/repository';

export class UseCaseWithPrismaFactory implements IUseCaseFactory {
	private readonly repository: IRepository = new Repository();

	public makeSaveBugReport(): SaveBugReport {
		return new SaveBugReport(this.repository);
	}
}
