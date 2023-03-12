export class MissingParams extends Error {
	constructor(paramName: string) {
		super(`Missing params: ${paramName}`);
		this.name = 'MissingParams';
		Object.setPrototypeOf(this, MissingParams.prototype);
	}
}
//
