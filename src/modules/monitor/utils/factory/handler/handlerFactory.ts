import { IUseCaseFactory } from '../useCase/IUseCaseFactory';
import { ReportBug } from '@modules/monitor/presentation/handlers/reportBug';
import { UseCaseWithPrismaFactory } from '../useCase/useCaseWithPrismaFactory';
import { ILogger } from '@infra/loggers/ILogger';
import { PinoLogger } from '@infra/loggers/pinoLogger';

export class HandlerFactory {
	private readonly logger: ILogger = PinoLogger.create();
	private readonly userCase: IUseCaseFactory = new UseCaseWithPrismaFactory();

	public makeReportBug(): ReportBug {
		return new ReportBug(this.logger, this.userCase);
	}
}
