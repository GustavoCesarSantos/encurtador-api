import { IRepository } from '../IRepository';
import { BugReport } from '@modules/monitor/domain/bugReport';

export class Repository implements IRepository {
	bugReport: BugReport[] = [];

	public async delete(id: number): Promise<void> {
		throw new Error('Method not implemented.');
	}

	public async findAll(): Promise<BugReport[]> {
		return this.bugReport;
	}

	public async findById(id: number): Promise<BugReport | undefined> {
		return this.bugReport.find(item => item.getId() === id);
	}

	public async save(entity: BugReport): Promise<void> {
		this.bugReport.push(entity);
	}

	public async update(id: number, entity: BugReport): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
