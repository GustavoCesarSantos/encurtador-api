import { EventNames } from '@helpers/eventNames';
import { Guard } from '@utils/guard';
import { HttpResponse } from '@helpers/httpResponse';
import { ICache } from '@infra/cache/ICache';
import { IController } from '@shared/IController';
import { IEventManager } from '@infra/listeners/eventManager';
import { IGenerateCode } from '../useCases/generateCode';
import { IQueue } from '@infra/queues/IQueue';
import { IReturnShortUrl } from '../useCases/returnShortUrl';
import { IShortUrlUseCaseFactory } from '@infra/factories/useCases/IShortUrlUseCaseFactory';
import { MissingParams } from '@helpers/errors/missingParams';
import { Response } from '@shared/response';
import { QueueName } from '@helpers/queue';

type Request = {
	body: {
		url: string;
	};
};

export class CreateShortUrl implements IController<Request> {
	private readonly cache: ICache;
	private readonly eventManager: IEventManager;
	private readonly generateCode: IGenerateCode;
	private readonly queue: IQueue;
	private readonly returnShortUrl: IReturnShortUrl;

	constructor(
		factory: IShortUrlUseCaseFactory,
		eventManager: IEventManager,
		cache: ICache,
		queue: IQueue,
	) {
		this.cache = cache;
		this.eventManager = eventManager;
		this.generateCode = factory.makeGenerateCode();
		this.queue = queue;
		this.returnShortUrl = factory.makeReturnShortUrl();
	}

	public async handle(request: Request): Promise<Response> {
		try {
			this.eventManager.notify({
				eventName: EventNames.info,
				message: {
					where: 'CreateShortUrl',
					what: `Iniciando requisição. Body: ${JSON.stringify(
						request.body,
					)}`,
				},
			});
			const { url } = request.body;
			const validationSchema = [{ propName: 'Url', value: url }];
			this.eventManager.notify({
				eventName: EventNames.info,
				message: {
					where: 'CreateShortUrl',
					what: `Iniciando validação do body: ${JSON.stringify(
						validationSchema,
					)} `,
				},
			});
			const result = Guard.againstEmptyOrUndefined(validationSchema);
			if (!result.isSuccess) {
				this.eventManager.notify({
					eventName: EventNames.error,
					message: {
						where: 'CreateShortUrl',
						what: `Body invalido: ${JSON.stringify(
							validationSchema,
						)}`,
					},
				});
				this.eventManager.notify({
					eventName: EventNames.error,
					message: {
						where: 'CreateShortUrl',
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
					where: 'CreateShortUrl',
					what: `Body validado com sucessso.`,
				},
			});
			this.eventManager.notify({
				eventName: EventNames.info,
				message: {
					where: 'CreateShortUrl',
					what: `Iniciando criação do código para a url: ${url}`,
				},
			});
			const code = this.generateCode.execute();
			this.eventManager.notify({
				eventName: EventNames.info,
				message: {
					where: 'CreateShortUrl',
					what: `Código: ${code} para a url: ${url} criado`,
				},
			});
			this.eventManager.notify({
				eventName: EventNames.info,
				message: {
					where: 'CreateShortUrl',
					what: `Iniciando criação da url encurtada, utilizando o código: ${code}, url original: ${url}`,
				},
			});
			const shortUrl = this.returnShortUrl.execute(code);
			this.eventManager.notify({
				eventName: EventNames.info,
				message: {
					where: 'CreateShortUrl',
					what: `Url encurtada: ${shortUrl} criada, utilizando o código: ${code}, url original: ${url}`,
				},
			});
			const jobData = JSON.stringify({ url, code });
			this.eventManager.notify({
				eventName: EventNames.info,
				message: {
					where: 'CreateShortUrl',
					what: `Iniciando envio de dados: ${jobData} para a fila de criação de url encurtada.`,
				},
			});
			await this.sendToShortenedUrlCreationQueue(jobData);
			this.eventManager.notify({
				eventName: EventNames.info,
				message: {
					where: 'CreateShortUrl',
					what: `Envio com sucesso para a fila de criação de url encurtada. Dados: ${jobData}`,
				},
			});
			this.eventManager.notify({
				eventName: EventNames.info,
				message: {
					where: 'CreateShortUrl',
					what: `Salvando em cache o código: ${code} e a url original: ${url}`,
				},
			});
			await this.cache.set(code, url);
			this.eventManager.notify({
				eventName: EventNames.info,
				message: {
					where: 'CreateShortUrl',
					what: `Salvo em cache o código: ${code} e a url original: ${url}`,
				},
			});
			this.eventManager.notify({
				eventName: EventNames.info,
				message: {
					where: 'CreateShortUrl',
					what: `Retornando a resposta: ${JSON.stringify({
						url: shortUrl,
					})}`,
				},
			});
			return HttpResponse.created({ url: shortUrl });
		} catch (error: any) {
			this.eventManager.notify({
				eventName: EventNames.error,
				message: {
					where: 'CreateShortUrl',
					what: `Catch error: ${error.message}`,
				},
			});
			return HttpResponse.serverError();
		}
	}

	private async sendToShortenedUrlCreationQueue(data: string): Promise<void> {
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'CreateShortUrl.sendToShortenedUrlCreationQueue',
				what: `Enviando dados para a fila de criação de urls encurtadas. Dados: ${data}`,
			},
		});
		await this.queue.add(QueueName.ShortenedUrlCreated, data);
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'CreateShortUrl.sendToShortenedUrlCreationQueue',
				what: `Dados enviados para a fila de criação de urls encurtadas. Dados: ${data}`,
			},
		});
	}
}
