import { ShortenedUrl } from '@modules/shortenedUrls/domain/shortenedUrl';
import { IMapper } from '@shared/mappers/IMapper';
import { Model } from '../external/db/model';

export class Mapper implements IMapper<ShortenedUrl> {
	public toDomain(model: Model): ShortenedUrl {
		const shortenedUrlOrError = ShortenedUrl.create({
			...model,
			customCode: model.customCode ?? undefined,
			qrCode: model.qrCode ?? undefined,
			lastAccess: model.lastAccess ?? undefined,
			createdAt: model.createdAt ?? undefined,
			updatedAt: model.updatedAt ?? undefined,
			removedAt: model.removedAt ?? undefined,
		});
		if (shortenedUrlOrError instanceof Error) throw shortenedUrlOrError;
		return shortenedUrlOrError;
	}

	public toPersistence(
		entity: ShortenedUrl,
	): Omit<Model, 'id' | 'lastAccess' | 'updatedAt' | 'removedAt'> {
		entity.setCreateDate();
		return {
			ownerId: entity.getOwnerId(),
			originalUrl: entity.getOriginalUrl(),
			code: entity.getCode(),
			customCode: entity.getCustomCode() ?? null,
			qrCode: entity.getQrCode() ?? null,
			accessCounter: entity.getAccessCounter(),
			createdAt: entity.getCreatedDate(),
		};
	}

	public toUpdate(
		entity: ShortenedUrl,
	): Partial<
		Omit<
			Model,
			'id' | 'accessCounter' | 'lastAccess' | 'createdAt' | 'removedAt'
		>
	> {
		entity.setUpdateDate();
		return {
			ownerId: entity.getOwnerId(),
			originalUrl: entity.getOriginalUrl(),
			code: entity.getCode(),
			customCode: entity.getCustomCode(),
			qrCode: entity.getQrCode(),
			updatedAt: entity.getUpdatedDate(),
		};
	}
}
