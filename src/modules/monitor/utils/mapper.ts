import { IMapper } from '@shared/mappers/IMapper';
import { Model } from '../external/db/model';
import { BugReport } from '../domain/bugReport';

export class Mapper implements IMapper<BugReport> {
	public toDomain(model: Model): BugReport {
		const bugReportOrError = BugReport.create(model);
		if (bugReportOrError instanceof Error) throw bugReportOrError;
		return bugReportOrError;
	}

	public toPersistence(entity: BugReport): Omit<Model, 'id'> {
		entity.setCreateDate();
		return {
			email: entity.getEmail(),
			description: entity.getDescription(),
			status: entity.getStatus(),
			createdAt: entity.getCreatedDate(),
		};
	}

	public toUpdate(
		entity: BugReport,
	): Partial<Omit<Model, 'id' | 'createdAt'>> {
		return {
			email: entity.getEmail(),
			description: entity.getDescription(),
			status: entity.getStatus(),
		};
	}
}
