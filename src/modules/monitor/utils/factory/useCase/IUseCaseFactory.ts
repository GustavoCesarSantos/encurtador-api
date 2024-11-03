import { ISaveBugReport } from '@modules/monitor/application/interface/ISaveBugReport';

export interface IUseCaseFactory {
	makeSaveBugReport(): ISaveBugReport;
}
