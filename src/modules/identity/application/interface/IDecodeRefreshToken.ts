import { RefreshTokenPayload } from '@shared/tokenPayload';

export interface IDecodeRefreshToken {
	execute(refreshToken: string): Promise<RefreshTokenPayload | null>;
}
