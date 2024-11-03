import { compare } from 'bcrypt';

import { IComparePassword } from '../interface/IComparePassword';

export class ComparePassword implements IComparePassword {
	async execute(
		plainTextPassword: string,
		encryptedPassword: string,
	): Promise<boolean> {
		return await compare(plainTextPassword, encryptedPassword);
	}
}
