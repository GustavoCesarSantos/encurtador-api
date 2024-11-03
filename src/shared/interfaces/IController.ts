import { Response } from '@shared/response';

export interface IController<T = any> {
	handle(request: T): Promise<Response>;
}
