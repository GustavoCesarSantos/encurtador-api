import { IMapper } from '@shared/mappers/IMapper';
import { User } from '../domain/user';
import { Model } from '../external/db/model';

export class Mapper implements IMapper<User> {
	public toDomain(model: Model): User {
		const userOrError = User.create(model);
		if (userOrError instanceof Error) throw userOrError;
		return userOrError;
	}

	public toPersistence(
		entity: User,
	): Omit<Model, 'id' | 'updatedAt' | 'removedAt'> {
		entity.setCreateDate();
		return {
			name: entity.getName(),
			email: entity.getEmail(),
			password: entity.getPassword(),
			active: entity.getActive(),
			createdAt: entity.getCreatedDate(),
		};
	}

	public toUpdate(
		entity: User,
	): Partial<Omit<Model, 'id' | 'createdAt' | 'removedAt'>> {
		entity.setUpdateDate();
		return {
			name: entity.getName(),
			email: entity.getEmail(),
			password: entity.getPassword(),
			active: entity.getActive(),
			updatedAt: entity.getUpdatedDate(),
		};
	}
}
