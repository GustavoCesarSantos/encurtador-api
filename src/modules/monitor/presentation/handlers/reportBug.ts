import { IController } from '@shared/interfaces/IController';
import { Response } from '@shared/response';
import { HttpResponse } from '@shared/httpResponse';
import { ISaveBugReport } from '@modules/monitor/application/interface/ISaveBugReport';
import { ReportBugInput } from '../dtos/reportBugInput';
import { IUseCaseFactory } from '@modules/monitor/utils/factory/useCase/IUseCaseFactory';

type Request = {
	body: {
		email: string;
		description: string;
	};
};

export class ReportBug implements IController<Request> {
	private readonly saveBugReport: ISaveBugReport;

	constructor(factory: IUseCaseFactory) {
		this.saveBugReport = factory.makeSaveBugReport();
	}

	public async handle(request: Request): Promise<Response> {
		try {
			const input = ReportBugInput.safeParse(request.body);
			if (!input.success) {
				return HttpResponse.badRequest(input.error);
			}
			const saveError = await this.saveBugReport.execute(input.data);
			if (saveError) return HttpResponse.badRequest(saveError);
			return HttpResponse.created({});
		} catch (error: unknown) {
			return HttpResponse.serverError();
		}
	}
}
