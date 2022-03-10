export class MissingParams extends Error {
	constructor(paramName: string) {
		super(`Missing params: ${paramName}`);
		Object.setPrototypeOf(this, MissingParams.prototype);
	}
}
