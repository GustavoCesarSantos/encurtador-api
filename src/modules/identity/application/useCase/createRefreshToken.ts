import { sign } from 'jsonwebtoken';

import { User } from '@modules/identity/domain/user';
import { variables } from '@shared/envs';
import { RefreshTokenPayload } from '@shared/tokenPayload';
import { ICreateRefreshToken } from '../interface/ICreateRefreshToken';

export class CreateRefreshToken implements ICreateRefreshToken {
	async execute(user: User): Promise<{ refreshToken: string }> {
		const payload: RefreshTokenPayload = {
			id: user.getId(),
			email: user.getEmail(),
			version: user.getAuthTokenVersion(),
		};
		return {
			refreshToken: sign(payload, variables.accessTokenSecret, {
				algorithm: 'HS256',
				expiresIn: variables.accessTokenExpirationTime,
			}),
		};
	}
}
