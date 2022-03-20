import { Response } from './response';

export interface IController<T = any> {
	handle(request: T): Promise<Response>;
}
