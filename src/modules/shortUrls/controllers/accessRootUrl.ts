import { EventNames } from '@helpers/eventNames';
import { Guard } from '@utils/guard';
import { HttpResponse } from '@helpers/httpResponse';
import { ICache } from '@infra/cache/ICache';
import { IController } from '@shared/IController';
import { IEventManager } from '@infra/listeners/eventManager';
import { IFindShortUrl } from '../useCases/findShortUrl';
import { IIncrementHit } from '../useCases/incrementHit';
import { IQueue } from '@infra/queues/IQueue';
import { IShortUrlUseCaseFactory } from '@infra/factories/useCases/IShortUrlUseCaseFactory';
import { MissingParams } from '@helpers/errors/missingParams';
import { Response } from '@shared/response';

type Request = {
	params: {
		code: string;
	};
};

type ShortenedUrl = { url: string; hits: number };

export class AccessRootUrl implements IController<Request> {
	private readonly cache: ICache;
	private readonly eventManager: IEventManager;
	private readonly findShortUrl: IFindShortUrl;
	private readonly incrementHit: IIncrementHit;
	// private readonly queue: IQueue;

	constructor(
		factory: IShortUrlUseCaseFactory,
		eventManager: IEventManager,
		cache: ICache,
		// queue: IQueue,
	) {
		this.cache = cache;
		this.eventManager = eventManager;
		this.findShortUrl = factory.makeFindShortUrl();
		this.incrementHit = factory.makeIncrementHit();
		// this.queue = queue;
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
			const shortenedUrl = await this.getShortenedUrl(code);
			if (!shortenedUrl) {
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
			this.eventManager.notify({
				eventName: EventNames.info,
				message: {
					where: 'AccessRootUrl',
					what: `Iniciando incremento do número de acessos a url, número atual: ${shortenedUrl.hits}`,
				},
			});
			const hits = await this.incrementHit.execute(shortenedUrl.hits);
			this.eventManager.notify({
				eventName: EventNames.info,
				message: {
					where: 'AccessRootUrl',
					what: `Incremento no número de acessos a url feito com sucesso, número atual: ${hits}`,
				},
			});
			// const jobData = { code, hits };
			// this.eventManager.notify({
			// 	eventName: EventNames.info,
			// 	message: {
			// 		where: 'AccessRootUrl',
			// 		what: `Enviando dados para a fila de atualização de hits da url encurtada. Data: ${JSON.stringify(
			// 			jobData,
			// 		)}`,
			// 	},
			// });
			// await this.queue.add('update', jobData);
			// this.eventManager.notify({
			// 	eventName: EventNames.info,
			// 	message: {
			// 		where: 'AccessRootUrl',
			// 		what: `Dados enviados para a fila de atualização de hits da url encurtada. Data: ${JSON.stringify(
			// 			jobData,
			// 		)}`,
			// 	},
			// });
			this.eventManager.notify({
				eventName: EventNames.info,
				message: {
					where: 'AccessRootUrl',
					what: `Iniciando atualização da camada de cache`,
				},
			});
			await this.updateCache(code, shortenedUrl.url, hits);
			this.eventManager.notify({
				eventName: EventNames.info,
				message: {
					where: 'AccessRootUrl',
					what: `Camada de cache atualizada`,
				},
			});
			this.eventManager.notify({
				eventName: EventNames.info,
				message: {
					where: 'AccessRootUrl',
					what: `Retornando a resposta: ${{
						rootUrl: shortenedUrl.url,
					}}`,
				},
			});
			return HttpResponse.okWithBody({ rootUrl: shortenedUrl.url });
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

	private async getShortenedUrl(code: string): Promise<ShortenedUrl | null> {
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'AccessRootUrl',
				what: `Iniciando busca pela url na camada de cache, utilizando o código: ${code}`,
			},
		});
		const rawShortenedUrlData = await this.cache.get(code);
		if (rawShortenedUrlData) {
			this.eventManager.notify({
				eventName: EventNames.info,
				message: {
					where: 'AccessRootUrl',
					what: `Url encontrada na camada de cache, utilizando o código: ${code}`,
				},
			});
			try {
				const shortenedUrlData = JSON.parse(rawShortenedUrlData);
				return {
					url: shortenedUrlData.url,
					hits: shortenedUrlData.hits,
				};
			} catch (error) {
				this.eventManager.notify({
					eventName: EventNames.error,
					message: {
						where: 'AccessRootUrl',
						what: `Falha ao tentar parsear dados da url vinda da camada de cache`,
					},
				});
				return null;
			}
		}
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'AccessRootUrl',
				what: `Iniciando busca pela url encurtada, utilizando o código: ${code}`,
			},
		});
		const shortUrl = await this.findShortUrl.execute(code);
		if (!shortUrl) {
			this.eventManager.notify({
				eventName: EventNames.error,
				message: {
					where: 'AccessRootUrl',
					what: `Url encurtada não encontrada utilizando o código: ${code}`,
				},
			});
			return null;
		}
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'AccessRootUrl',
				what: `Url encurtada encontrada, utilizando o código: ${code}`,
			},
		});
		return { url: shortUrl.getRootUrl(), hits: shortUrl.getHits() };
	}

	private async updateCache(
		code: string,
		url: string,
		hits: number,
	): Promise<void> {
		await this.cache.del(code);
		await this.cache.set(code, JSON.stringify({ url, hits }));
	}
}
