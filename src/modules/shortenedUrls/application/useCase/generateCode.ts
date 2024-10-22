import { randomUUID } from 'node:crypto';

import { IGenerateCode } from '../interface/IGenerateCode';

export class GenerateCode implements IGenerateCode {
	public execute(): string {
		return randomUUID().slice(0, 5);
	}
}
