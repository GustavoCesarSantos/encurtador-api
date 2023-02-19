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
			this.eventManager.notify({
				eventName: EventNames.info,
				message: {
					where: 'AccessRootUrl',
					what: `Iniciando requisição. Params: ${JSON.stringify(
						request.params,
					)}`,
				},
			});
			const { code } = request.params;
			const validationSchema = [{ propName: 'Code', value: code }];
			this.eventManager.notify({
				eventName: EventNames.info,
				message: {
					where: 'AccessRootUrl',
					what: `Iniciando validação dos params: ${JSON.stringify(
						validationSchema,
					)} `,
				},
			});
			const result = Guard.againstEmptyOrUndefined(validationSchema);
			if (!result.isSuccess) {
				this.eventManager.notify({
					eventName: EventNames.error,
					message: {
						where: 'AccessRootUrl',
						what: `Params invalido: ${JSON.stringify(
							validationSchema,
						)}`,
					},
				});
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
			this.eventManager.notify({
				eventName: EventNames.info,
				message: {
					where: 'AccessRootUrl',
					what: `Params validado com sucessso.`,
				},
			});
			this.eventManager.notify({
				eventName: EventNames.info,
				message: {
					where: 'CreateShortUrl',
					what: `Iniciando retorno da url original utilizando o código: ${code}.`,
				},
			});
			const rootUrl = await this.getRootUrl(code);
			if (!rootUrl) {
				this.eventManager.notify({
					eventName: EventNames.error,
					message: {
						where: 'AccessRootUrl',
						what: `Url original não encontrada utilizando o código: ${code}.`,
					},
				});
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
					what: `Iniciando envio para a fila de atualização de hits da url encurtada.`,
				},
			});
			await this.sendToShortenedUrlHitsUpdatedQueue('1');
			this.eventManager.notify({
				eventName: EventNames.info,
				message: {
					where: 'AccessRootUrl',
					what: `Envio para a fila de atualização de hits da url encurtada feito com sucesso.`,
				},
			});
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
				what: `Iniciando busca pela url original na camada de cache, utilizando o código: ${code}`,
			},
		});
		const rootUrlCache = await this.cache.get(code);
		if (!rootUrlCache) {
			this.eventManager.notify({
				eventName: EventNames.warn,
				message: {
					where: 'AccessRootUrl.getRootUrlFromCache',
					what: `Url original não encontrada na camada de cache utilizando o código: ${code}.`,
				},
			});
			return null;
		}
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'AccessRootUrl.getRootUrlFromCache',
				what: `Url original encontrada na camada de cache. Code: ${code}, Url: ${rootUrlCache}`,
			},
		});
		return rootUrlCache;
	}

	private async getRootUrlFromDB(code: string): Promise<string | null> {
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'AccessRootUrl.getRootUrlFromDB',
				what: `Iniciando busca pelo registro da url encurtada no banco de dados, utilizando o código: ${code}`,
			},
		});
		const shortenedUrl = await this.findShortUrl.execute(code);
		if (!shortenedUrl) {
			this.eventManager.notify({
				eventName: EventNames.warn,
				message: {
					where: 'AccessRootUrl.getRootUrlFromDB',
					what: `Registro da url encurtada não encontrada no banco de dados utilizando o código: ${code}`,
				},
			});
			return null;
		}
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'AccessRootUrl.getRootUrlFromDB',
				what: `Registro da url encurtada encontrada no banco de dados, utilizando o código: ${code}`,
			},
		});
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'AccessRootUrl.getRootUrlFromDB',
				what: `Retornando url original do registro encontrado no banco de dados, utilizando o código: ${code}`,
			},
		});
		return shortenedUrl.getRootUrl();
	}

	private async updateCache(code: string, rootUrl: string): Promise<void> {
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'AccessRootUrl.updateCache',
				what: `Iniciando atualização da camada de cache. Código ${code} e Url: ${rootUrl}.`,
			},
		});
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'AccessRootUrl.updateCache',
				what: `Iniciando remoção do chave atual. Chave ${code}.`,
			},
		});
		await this.cache.del(code);
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'AccessRootUrl.updateCache',
				what: `Chave removida com sucesso. Chave ${code}`,
			},
		});
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'AccessRootUrl.updateCache',
				what: `Iniciando inserção da url original na camada de cache. Código ${code} e Url: ${rootUrl}.`,
			},
		});
		await this.cache.set(code, rootUrl);
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'AccessRootUrl.updateCache',
				what: `Url original inserida com sucesso na camada de cache. Código ${code} e Url: ${rootUrl}.`,
			},
		});
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'AccessRootUrl.updateCache',
				what: `Camada de cache atualizada com sucesso.`,
			},
		});
	}

	private async getRootUrl(code: string): Promise<string | null> {
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'AccessRootUrl.getRootUrl',
				what: `Iniciando busca da url original na camada de cache.`,
			},
		});
		const rootUrlCache = await this.getRootUrlFromCache(code);
		if (rootUrlCache) {
			this.eventManager.notify({
				eventName: EventNames.info,
				message: {
					where: 'AccessRootUrl.getRootUrl',
					what: `Retornando url original encontrada na camada de cache. Url: ${rootUrlCache}`,
				},
			});
			return rootUrlCache;
		}
		this.eventManager.notify({
			eventName: EventNames.warn,
			message: {
				where: 'AccessRootUrl.getRootUrl',
				what: `Url original não encontrada na camada de cache.`,
			},
		});
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'AccessRootUrl.getRootUrl',
				what: `Iniciando busca da url original na camada de banco de dados utilizando o código: ${code}`,
			},
		});
		const rootUrlDB = await this.getRootUrlFromDB(code);
		if (!rootUrlDB) {
			this.eventManager.notify({
				eventName: EventNames.warn,
				message: {
					where: 'AccessRootUrl.getRootUrl',
					what: `Url original não encontrada na camada de banco de dados utilizando o código: ${code}.`,
				},
			});
			return null;
		}
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'AccessRootUrl.getRootUrl',
				what: `Url original encontrada na camada de banco de dados utilizando o código: ${code}.`,
			},
		});
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'AccessRootUrl.getRootUrl',
				what: `Iniciando atualização da camada de cache. Code: ${code} Url: ${rootUrlDB}.`,
			},
		});
		await this.updateCache(code, rootUrlDB);
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'AccessRootUrl.getRootUrl',
				what: `Camada de cache atualizada com sucesso. Code: ${code} Url: ${rootUrlDB}.`,
			},
		});
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'AccessRootUrl.getRootUrl',
				what: `Retornando url original: ${rootUrlDB} encontrada na camada de banco de dados utilizando o código: ${code}.`,
			},
		});
		return rootUrlDB;
	}

	private async sendToShortenedUrlHitsUpdatedQueue(
		data: string,
	): Promise<void> {
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'AccessRootUrl.sendToShortenedUrlHitsUpdatedQueue',
				what: 'Iniciando envio de dados para a fila de atualização de hits da url encurtada.',
			},
		});
		await this.queue.add(QueueName.ShortenedUrlHitsUpdated, data);
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'AccessRootUrl.sendToShortenedUrlHitsUpdatedQueue',
				what: 'Envio para a fila de atualização de hits da url encurtada feita com sucesso.',
			},
		});
	}
}
