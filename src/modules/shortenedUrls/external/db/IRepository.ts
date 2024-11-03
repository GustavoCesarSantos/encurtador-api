import { ShortenedUrl } from '@modules/shortenedUrls/domain/shortenedUrl';
import { IBaseRepository } from '@shared/db/IBaseRepository';

export interface IRepository extends IBaseRepository<ShortenedUrl> {
	findByCode(code: string): Promise<ShortenedUrl | undefined>;
	findAllByOwnerId(ownerId: number): Promise<ShortenedUrl[]>;
	incrementAccess(code: string): Promise<void>;
}
