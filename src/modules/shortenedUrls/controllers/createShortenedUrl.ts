import { EventNames } from '@helpers/eventNames';
import { Guard } from '@utils/guard';
import { HttpResponse } from '@helpers/httpResponse';
import { ICache } from '@infra/cache/ICache';
import { IController } from '@shared/IController';
import { IEventManager } from '@infra/listeners/eventManager';
import { IGenerateCode } from '../useCases/generateCode';
import { IReturnShortenedUrl } from '../useCases/returnShortenedUrl';
import { IShortenedUrlUseCaseFactory } from '@infra/factories/useCases/IShortenedUrlUseCaseFactory';
import { MissingParams } from '@helpers/errors/missingParams';
import { Response } from '@shared/response';

type Request = {
	body: {
		url: string;
	};
};

export class CreateShortenedUrl implements IController<Request> {
	private readonly cache: ICache;
	private readonly eventManager: IEventManager;
	private readonly generateCode: IGenerateCode;
	private readonly returnShortenedUrl: IReturnShortenedUrl;

	constructor(
		factory: IShortenedUrlUseCaseFactory,
		eventManager: IEventManager,
		cache: ICache,
	) {
		this.cache = cache;
		this.eventManager = eventManager;
		this.generateCode = factory.makeGenerateCode();
		this.returnShortenedUrl = factory.makeReturnShortenedUrl();
	}

	public async handle(request: Request): Promise<Response> {
		try {
			this.eventManager.notify({
				eventName: EventNames.info,
				message: {
					where: 'CreateShortenedUrl',
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
					where: 'CreateShortenedUrl',
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
						where: 'CreateShortenedUrl',
						what: `Body invalido: ${JSON.stringify(
							validationSchema,
						)}`,
					},
				});
				this.eventManager.notify({
					eventName: EventNames.error,
					message: {
						where: 'CreateShortenedUrl',
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
					where: 'CreateShortenedUrl',
					what: `Body validado com sucessso.`,
				},
			});
			this.eventManager.notify({
				eventName: EventNames.info,
				message: {
					where: 'CreateShortenedUrl',
					what: `Iniciando criação do código para a url: ${url}`,
				},
			});
			const code = this.generateCode.execute();
			this.eventManager.notify({
				eventName: EventNames.info,
				message: {
					where: 'CreateShortenedUrl',
					what: `Código: ${code} para a url: ${url} criado`,
				},
			});
			this.eventManager.notify({
				eventName: EventNames.info,
				message: {
					where: 'CreateShortenedUrl',
					what: `Iniciando criação da url encurtada, utilizando o código: ${code}, url original: ${url}`,
				},
			});
			const shortenedUrl = this.returnShortenedUrl.execute(code);
			this.eventManager.notify({
				eventName: EventNames.info,
				message: {
					where: 'CreateShortenedUrl',
					what: `Url encurtada: ${shortenedUrl} criada, utilizando o código: ${code}, url original: ${url}`,
				},
			});
			this.eventManager.notify({
				eventName: EventNames.info,
				message: {
					where: 'CreateShortenedUrl',
					what: `Salvando em cache o código: ${code} e a url original: ${url}`,
				},
			});
			await this.createShortTermCache(code, url);
			this.eventManager.notify({
				eventName: EventNames.info,
				message: {
					where: 'CreateShortenedUrl',
					what: `Salvo em cache o código: ${code} e a url original: ${url}`,
				},
			});
			this.eventManager.notify({
				eventName: EventNames.info,
				message: {
					where: 'CreateShortenedUrl',
					what: `Retornando a resposta: ${JSON.stringify({
						url: shortenedUrl,
					})}`,
				},
			});
			return HttpResponse.created({ url: shortenedUrl });
		} catch (error: any) {
			this.eventManager.notify({
				eventName: EventNames.error,
				message: {
					where: 'CreateShortenedUrl',
					what: `Catch error: ${error.message}`,
				},
			});
			return HttpResponse.serverError();
		}
	}

	private async createShortTermCache(
		code: string,
		url: string,
	): Promise<void> {
		await this.cache.setWithExpiration(`${code}:shortTerm`, url, 3600);
	}
}
