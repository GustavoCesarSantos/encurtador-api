export class NotFound extends Error {
	constructor() {
		super(`Not found`);
		this.name = 'NotFound';
		Object.setPrototypeOf(this, NotFound.prototype);
	}
}
