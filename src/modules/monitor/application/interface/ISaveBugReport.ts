import { ReportBugInput } from '@modules/monitor/presentation/dtos/reportBugInput';

export interface ISaveBugReport {
	execute(data: ReportBugInput): Promise<void | Error>;
}
