import { randomUUID } from 'crypto';
export interface IGenerateCode {
	execute(): string;
}

export class GenerateCode implements IGenerateCode {
	execute(): string {
		return randomUUID().slice(0, 5);
	}
}
