import {
	IUpdateShortUrl,
	UpdateShortUrl,
} from '@modules/shortUrls/useCases/updateShortUrl';
import { EventManagerDummy } from '../../../testDoubles/dummy/eventManager';
import { ShortUrlRepositoryDummy } from '../../../testDoubles/dummy/shortUrlRepository';

let updateShortUrl: IUpdateShortUrl;

const makeSut = () => {
	const shortUrlRepositoryDummy = new ShortUrlRepositoryDummy();
	const eventManagerDummy = new EventManagerDummy();
	return new UpdateShortUrl(shortUrlRepositoryDummy, eventManagerDummy);
};

describe('Update short url', () => {
	beforeEach(() => {
		updateShortUrl = makeSut();
	});

	test('Should update info of the short url', async () => {
		const uuid = '12345';
		const hits = 3;
		const data = { hits };
		expect(updateShortUrl.execute(uuid, data)).resolves.not.toThrow();
	});
});
