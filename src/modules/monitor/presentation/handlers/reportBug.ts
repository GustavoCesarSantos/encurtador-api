import { IController } from '@shared/interfaces/IController';
import { Response } from '@shared/response';
import { HttpResponse } from '@shared/httpResponse';
import { ISaveBugReport } from '@modules/monitor/application/interface/ISaveBugReport';
import { ReportBugInput } from '../dtos/reportBugInput';
import { IUseCaseFactory } from '@modules/monitor/utils/factory/useCase/IUseCaseFactory';
import { ILogger } from '@infra/loggers/ILogger';

type Request = {
	body: {
		email: string;
		description: string;
	};
};

export class ReportBug implements IController<Request> {
	private readonly logger: ILogger;
	private readonly saveBugReport: ISaveBugReport;

	constructor(logger: ILogger, factory: IUseCaseFactory) {
		this.logger = logger;
		this.saveBugReport = factory.makeSaveBugReport();
	}

	public async handle(request: Request): Promise<Response> {
		try {
			const input = ReportBugInput.safeParse(request.body);
			if (!input.success) {
				this.logger.error({
					where: 'ReportBug.handle(26)',
					what: input.error.message,
				});
				return HttpResponse.badRequest(input.error);
			}
			const saveError = await this.saveBugReport.execute(input.data);
			if (saveError) {
				this.logger.error({
					where: 'ReportBug.handle(34)',
					what: saveError.message,
				});
				return HttpResponse.badRequest(saveError);
			}
			return HttpResponse.created({});
		} catch (error: unknown) {
			this.logger.error({
				where: 'ReportBug.handle.catch',
				what: (error as Error).message,
			});
			return HttpResponse.serverError();
		}
	}
}
