export interface IComparePassword {
	execute(
		plainTextPassword: string,
		encryptedPassword: string,
	): Promise<boolean>;
}
