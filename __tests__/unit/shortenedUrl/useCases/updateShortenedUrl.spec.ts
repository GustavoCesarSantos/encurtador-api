import {
	IUpdateShortenedUrl,
	UpdateShortenedUrl,
} from '@modules/shortenedUrls/useCases/updateShortenedUrl';
import { EventManagerDummy } from '../../../testDoubles/dummy/eventManager';
import { ShortenedUrlRepositoryDummy } from '../../../testDoubles/dummy/shortenedUrlRepository';

let updateShortenedUrl: IUpdateShortenedUrl;

const makeSut = () => {
	const shortUrlRepositoryDummy = new ShortenedUrlRepositoryDummy();
	const eventManagerDummy = new EventManagerDummy();
	return new UpdateShortenedUrl(shortUrlRepositoryDummy, eventManagerDummy);
};

describe('Update short url', () => {
	beforeEach(() => {
		updateShortenedUrl = makeSut();
	});

	test('Should update info of the short url', async () => {
		const uuid = '12345';
		const hits = 3;
		const data = { hits };
		expect(updateShortenedUrl.execute(uuid, data)).resolves.not.toThrow();
	});
});
