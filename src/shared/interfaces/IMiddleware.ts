import { Response } from '@shared/response';

export interface IMiddleware<T = any> {
	handle(request: T): Promise<Response>;
}
