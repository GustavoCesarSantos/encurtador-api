import { Repository } from '@modules/monitor/external/db/memory/repository';
import { IUseCaseFactory } from './IUseCaseFactory';
import { SaveBugReport } from '@modules/monitor/application/useCase/saveBugReport';
import { IRepository } from '@modules/monitor/external/db/IRepository';

export class UseCaseWithMemoryFactory implements IUseCaseFactory {
	private readonly repository: IRepository = new Repository();

	public makeSaveBugReport(): SaveBugReport {
		return new SaveBugReport(this.repository);
	}
}
