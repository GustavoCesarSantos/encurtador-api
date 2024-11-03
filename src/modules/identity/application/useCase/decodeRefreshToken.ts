import { verify } from 'jsonwebtoken';

import { variables } from '@shared/envs';
import { RefreshTokenPayload } from '@shared/tokenPayload';
import { IDecodeRefreshToken } from '../interface/IDecodeRefreshToken';

export class DecodeRefreshToken implements IDecodeRefreshToken {
	async execute(refreshToken: string): Promise<RefreshTokenPayload | null> {
		return verify(
			refreshToken,
			variables.refreshTokenSecret,
		) as RefreshTokenPayload;
	}
}
