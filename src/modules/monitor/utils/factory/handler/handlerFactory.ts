import { IUseCaseFactory } from '../useCase/IUseCaseFactory';
import { ReportBug } from '@modules/monitor/presentation/handlers/reportBug';
import { UseCaseWithPrismaFactory } from '../useCase/useCaseWithPrismaFactory';

export class HandlerFactory {
	private readonly userCase: IUseCaseFactory = new UseCaseWithPrismaFactory();

	public makeReportBug(): ReportBug {
		return new ReportBug(this.userCase);
	}
}
