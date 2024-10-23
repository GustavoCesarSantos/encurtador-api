import { TokenPayload } from '@shared/tokenPayload';

declare namespace Express {
	export interface Request {
		user: TokenPayload;
	}
}
