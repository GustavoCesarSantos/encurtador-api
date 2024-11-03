import { BugReport } from '@modules/monitor/domain/bugReport';
import { ISaveBugReport } from '../interface/ISaveBugReport';
import { IRepository } from '@modules/monitor/external/db/IRepository';
import { ReportBugInput } from '@modules/monitor/presentation/dtos/reportBugInput';

export class SaveBugReport implements ISaveBugReport {
	private readonly repository: IRepository;

	constructor(repository: IRepository) {
		this.repository = repository;
	}

	async execute(data: ReportBugInput): Promise<void | Error> {
		const bugReportOrError = BugReport.create(data);
		if (bugReportOrError instanceof Error) {
			return bugReportOrError;
		}
		await this.repository.save(bugReportOrError);
	}
}
