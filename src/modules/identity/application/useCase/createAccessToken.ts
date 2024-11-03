import { sign } from 'jsonwebtoken';

import { ICreateAccessToken } from '../interface/ICreateAccessToken';
import { User } from '@modules/identity/domain/user';
import { variables } from '@shared/envs';
import { AccessTokenPayload } from '@shared/tokenPayload';

export class CreateAccessToken implements ICreateAccessToken {
	async execute(user: User): Promise<{ accessToken: string }> {
		const payload: AccessTokenPayload = {
			id: user.getId(),
			email: user.getEmail(),
			version: user.getAuthTokenVersion(),
		};
		return {
			accessToken: sign(payload, variables.accessTokenSecret, {
				algorithm: 'HS256',
				expiresIn: variables.accessTokenExpirationTime,
			}),
		};
	}
}
