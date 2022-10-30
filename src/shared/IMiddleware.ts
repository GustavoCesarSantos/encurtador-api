import { Response } from './response';

export interface IMiddleware<T = any> {
	handle(request: T): Promise<Response>;
}
