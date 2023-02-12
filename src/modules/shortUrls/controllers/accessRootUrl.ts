import { EventNames } from '@helpers/eventNames';
import { Guard } from '@utils/guard';
import { HttpResponse } from '@helpers/httpResponse';
import { ICache } from '@infra/cache/ICache';
import { IController } from '@shared/IController';
import { IEventManager } from '@infra/listeners/eventManager';
import { IFindShortUrl } from '../useCases/findShortUrl';
import { IQueue } from '@infra/queues/IQueue';
import { IShortUrlUseCaseFactory } from '@infra/factories/useCases/IShortUrlUseCaseFactory';
import { MissingParams } from '@helpers/errors/missingParams';
import { Response } from '@shared/response';
import { QueueName } from '@helpers/queue';

type Request = {
	params: {
		code: string;
	};
};

export class AccessRootUrl implements IController<Request> {
	private readonly cache: ICache;
	private readonly eventManager: IEventManager;
	private readonly findShortUrl: IFindShortUrl;
	private readonly queue: IQueue;

	constructor(
		factory: IShortUrlUseCaseFactory,
		eventManager: IEventManager,
		cache: ICache,
		queue: IQueue,
	) {
		this.cache = cache;
		this.eventManager = eventManager;
		this.findShortUrl = factory.makeFindShortUrl();
		this.queue = queue;
	}

	public async handle(request: Request): Promise<Response> {
		try {
			const { code } = request.params;
			const result = Guard.againstEmptyOrUndefined([
				{ propName: 'Code', value: code },
			]);
			if (!result.isSuccess) {
				this.eventManager.notify({
					eventName: EventNames.error,
					message: {
						where: 'AccessRootUrl',
						what: new MissingParams(`${result.isError}`).message,
					},
				});
				return HttpResponse.badRequest(
					new MissingParams(`${result.isError}`),
				);
			}
			const rootUrl = await this.getRootUrl(code);
			if (!rootUrl) {
				this.eventManager.notify({
					eventName: EventNames.error,
					message: {
						where: 'AccessRootUrl',
						what:
							HttpResponse.notFound().body.message ??
							'Not Found()',
					},
				});
				return HttpResponse.notFound();
			}
			await this.sendToShortenedUrlHitsUpdatedQueue('1');
			this.eventManager.notify({
				eventName: EventNames.info,
				message: {
					where: 'AccessRootUrl',
					what: `Retornando a resposta: ${{
						rootUrl: rootUrl,
					}}`,
				},
			});
			return HttpResponse.okWithBody({ rootUrl });
		} catch (error: any) {
			this.eventManager.notify({
				eventName: EventNames.error,
				message: {
					where: 'AccessRootUrl',
					what: `Catch error: ${error.message}`,
				},
			});
			return HttpResponse.serverError();
		}
	}

	private async getRootUrlFromCache(code: string): Promise<string | null> {
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'AccessRootUrl.getRootUrlFromCache',
				what: `Iniciando busca pela url na camada de cache, utilizando o código: ${code}`,
			},
		});
		const shortenedUrlCache = await this.cache.get(code);
		if (!shortenedUrlCache) {
			this.eventManager.notify({
				eventName: EventNames.warn,
				message: {
					where: 'AccessRootUrl.getRootUrlFromCache',
					what: `Url não encontrada na camada de cache. key: ${code}`,
				},
			});
			return null;
		}
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'AccessRootUrl.getRootUrlFromCache',
				what: `Url encontrada na camada de cache. key: ${code}, value: ${shortenedUrlCache}`,
			},
		});
		return shortenedUrlCache;
	}

	private async getRootUrlFromDB(code: string): Promise<string | null> {
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'AccessRootUrl',
				what: `Iniciando busca pela url encurtada no banco de dados, utilizando o código: ${code}`,
			},
		});
		const shortenedUrl = await this.findShortUrl.execute(code);
		if (!shortenedUrl) {
			this.eventManager.notify({
				eventName: EventNames.error,
				message: {
					where: 'AccessRootUrl',
					what: `Url encurtada não encontrada no banco de dados utilizando o código: ${code}`,
				},
			});
			return null;
		}
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'AccessRootUrl',
				what: `Url encurtada encontrada no banco de dados, utilizando o código: ${code}`,
			},
		});
		return shortenedUrl.getRootUrl();
	}

	private async updateCache(code: string, rootUrl: string): Promise<void> {
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'AccessRootUrl',
				what: `Iniciando atualização da camada de cache`,
			},
		});
		await this.cache.del(code);
		await this.cache.set(code, rootUrl);
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'AccessRootUrl',
				what: `Camada de cache atualizada`,
			},
		});
	}

	private async getRootUrl(code: string): Promise<string | null> {
		const rootUrlCache = await this.getRootUrlFromCache(code);
		if (rootUrlCache) return rootUrlCache;
		const rootUrlDB = await this.getRootUrlFromDB(code);
		if (!rootUrlDB) return null;
		await this.updateCache(code, rootUrlDB);
		return rootUrlDB;
	}

	private async sendToShortenedUrlHitsUpdatedQueue(
		data: string,
	): Promise<void> {
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'AccessRootUrl',
				what: 'Enviando dados para a fila de atualização de hits da url encurtada.',
			},
		});
		await this.queue.add(QueueName.ShortenedUrlHitsUpdated, data);
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'AccessRootUrl',
				what: 'Dados enviados para a fila de atualização de hits da url encurtada.',
			},
		});
	}
}
