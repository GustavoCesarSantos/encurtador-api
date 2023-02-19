import { ShortenedUrl } from '@modules/shortenedUrls/shortenedUrl';
import { Mapper } from './IMapper';

export class ShortenedUrlMapper implements Mapper<ShortenedUrl> {
	public toDomain(raw: any): ShortenedUrl | null {
		const shortenedUrlOrError = ShortenedUrl.create(raw);
		if (shortenedUrlOrError instanceof Error) return null;
		return shortenedUrlOrError;
	}

	public toPersistence(entity: ShortenedUrl) {
		entity.setCreatedDate();
		return {
			uuid: entity.getUUID(),
			url: entity.getRootUrl(),
			code: entity.getCode(),
			hits: entity.getHits(),
			createdat: entity.getCreatedDate(),
			ownerid: entity.getOwnerId(),
		};
	}
}
