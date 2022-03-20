export class NotFound extends Error {
	constructor() {
		super(`Not found`);
		Object.setPrototypeOf(this, NotFound.prototype);
	}
}
