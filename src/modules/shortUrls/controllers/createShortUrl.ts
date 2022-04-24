import { MissingParams } from '@helpers/errors/missingParams';
import { Guard } from '@utils/guard';
import { IController } from '@shared/IController';
import { Response } from '@shared/response';
import { IGenerateCode } from '../useCases/generateCode';
import { IReturnShortUrl } from '../useCases/returnShortUrl';
import { ISaveShortUrl } from '../useCases/saveShortUrl';
import { HttpResponse } from '@helpers/httpResponse';
import { IShortUrlUseCaseFactory } from '@infra/factories/useCases/IShortUrlUseCaseFactory';
import { IEventManager } from '@infra/listeners/eventManager';
import { EventNames } from '@helpers/eventNames';

type Request = {
	body: {
		url: string;
	};
};

export class CreateShortUrl implements IController<Request> {
	private readonly generateCode: IGenerateCode;
	private readonly returnShortUrl: IReturnShortUrl;
	private readonly saveShortUrl: ISaveShortUrl;
	private readonly eventManager: IEventManager;

	constructor(factory: IShortUrlUseCaseFactory, eventManager: IEventManager) {
		this.generateCode = factory.makeGenerateCode();
		this.returnShortUrl = factory.makeReturnShortUrl();
		this.saveShortUrl = factory.makeSaveShortUrl();
		this.eventManager = eventManager;
	}

	public async handle(request: Request): Promise<Response> {
		const { url } = request.body;
		const result = Guard.againstEmptyOrUndefined([
			{ propName: 'Url', value: url },
		]);
		if (!result.isSuccess) {
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
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'CreateShortUrl',
				what: `Iniciando persistencia dos dados da url encurtada: ${shortUrl}, código: ${code}, url original: ${url}`,
			},
		});
		const error = await this.saveShortUrl.execute(url, code);
		if (error) {
			this.eventManager.notify({
				eventName: EventNames.error,
				message: {
					where: 'CreateShortUrl',
					what: `Persistencia dos dados da url encurtada: ${shortUrl} falhou, error: ${error.message}`,
				},
			});
			return HttpResponse.badRequest(error);
		}
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'CreateShortUrl',
				what: `Persistencia dos dados da url encurtada: ${shortUrl} concluida`,
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
		return HttpResponse.okWithBody({ url: shortUrl });
	}
}
