import { ShortUrl } from '@modules/shortUrls/shortUrl';
import { Mapper } from './IMapper';

export class ShortUrlMapper implements Mapper<ShortUrl> {
	public toDomain(raw: any): ShortUrl | null {
		const shortUrlOrError = ShortUrl.create(raw);
		if (shortUrlOrError instanceof Error) return null;
		return shortUrlOrError;
	}

	public toPersistence(entity: ShortUrl) {
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
