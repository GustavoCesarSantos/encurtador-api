import { MissingParams } from '@helpers/errors/missingParams';
import { NotFound } from '@helpers/errors/notFound';
import { AccessRootUrl } from '@modules/shortUrls/controllers/accessRootUrl';
import { ShortUrl } from '@modules/shortUrls/shortUrl';
import { IFindShortUrl } from '@modules/shortUrls/useCases/findShortUrl';
import { IIncrementHit } from '@modules/shortUrls/useCases/incrementHit';
import { IUpdateShortUrl } from '@modules/shortUrls/useCases/updateShortUrl';
import { IController } from '@shared/IController';

let accessRootUrl: IController;

class FindShortUrlFakie implements IFindShortUrl {
	async execute(code: string): Promise<ShortUrl | null> {
		if (code === 'success') {
			const shortUrl = ShortUrl.create({ code, url: 'teste' });
			if (shortUrl instanceof Error) return null;
			return shortUrl;
		}
		return null;
	}
}

class IncrementHitDummie implements IIncrementHit {
	execute(hit: number): number {
		return 1;
	}
}

class UpdateShortUrlDummie implements IUpdateShortUrl {
	async execute(identifier: string, data: any): Promise<void> {
		return;
	}
}

const makeSut = () => {
	const findShortUrl = new FindShortUrlFakie();
	const incrementHit = new IncrementHitDummie();
	const updateShortUrl = new UpdateShortUrlDummie();
	return new AccessRootUrl({ findShortUrl, incrementHit, updateShortUrl });
};

describe('Access root url', () => {
	beforeEach(() => {
		accessRootUrl = makeSut();
	});

	test('Should return 400 when code is not provided', async () => {
		const response = await accessRootUrl.handle({ params: { code: '' } });
		expect(response.status).toBe(400);
	});

	test('Should return a missing params error when code is not provided', async () => {
		const response = await accessRootUrl.handle({ params: { code: '' } });
		expect(response.body).toStrictEqual({
			message: new MissingParams('Code'),
		});
	});

	test('Should return 404 when short url schema is not found', async () => {
		const response = await accessRootUrl.handle({
			params: { code: 'fail' },
		});
		expect(response.status).toBe(404);
	});

	test('Should return a not found error when short url schema is not found', async () => {
		const response = await accessRootUrl.handle({
			params: { code: 'fail' },
		});
		expect(response.body).toStrictEqual({
			message: new NotFound(),
		});
	});

	test('Should return 302 when root url can be redirect', async () => {
		const response = await accessRootUrl.handle({
			params: { code: 'success' },
		});
		expect(response.status).toBe(302);
	});

	test('Should return root url when this can be redirect', async () => {
		const response = await accessRootUrl.handle({
			params: { code: 'success' },
		});
		expect(response.body).toStrictEqual({ rootUrl: 'teste' });
	});
});
