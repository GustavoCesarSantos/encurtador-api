import { AccessTokenPayload } from '@shared/tokenPayload';

declare namespace Express {
	export interface Request {
		user: AccessTokenPayload;
	}
}
