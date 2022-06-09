import { MissingParams } from '@helpers/errors/missingParams';
import { HttpResponse } from '@helpers/httpResponse';
import { Response } from '@shared/response';
import { Guard } from '@utils/guard';
import { IController } from '@shared/IController';
import { IFindShortUrl } from '../useCases/findShortUrl';
import { IIncrementHit } from '../useCases/incrementHit';
import { IUpdateShortUrl } from '../useCases/updateShortUrl';
import { IShortUrlUseCaseFactory } from '@infra/factories/useCases/IShortUrlUseCaseFactory';
import { IEventManager } from '@infra/listeners/eventManager';
import { EventNames } from '@helpers/eventNames';

type Request = {
	params: {
		code: string;
	};
};

export class AccessRootUrl implements IController<Request> {
	private readonly findShortUrl: IFindShortUrl;
	private readonly incrementHit: IIncrementHit;
	private readonly updateShortUrl: IUpdateShortUrl;
	private readonly eventManager: IEventManager;

	constructor(factory: IShortUrlUseCaseFactory, eventManager: IEventManager) {
		this.findShortUrl = factory.makeFindShortUrl();
		this.incrementHit = factory.makeIncrementHit();
		this.updateShortUrl = factory.makeUpdateShortUrl();
		this.eventManager = eventManager;
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
				return HttpResponse.notFound();
			}
			this.eventManager.notify({
				eventName: EventNames.info,
				message: {
					where: 'AccessRootUrl',
					what: `Url encurtada: ${shortUrl} encontrada, utilizando o código: ${code}`,
				},
			});
			this.eventManager.notify({
				eventName: EventNames.info,
				message: {
					where: 'AccessRootUrl',
					what: `Iniciando incremento do número de acessos a url, número atual: ${shortUrl.getHits()}`,
				},
			});
			const hits = await this.incrementHit.execute(shortUrl.getHits());
			this.eventManager.notify({
				eventName: EventNames.info,
				message: {
					where: 'AccessRootUrl',
					what: `Incremento no número de acessos a url feito com sucesso, número atual: ${hits}`,
				},
			});
			this.eventManager.notify({
				eventName: EventNames.info,
				message: {
					where: 'AccessRootUrl',
					what: `Iniciando atualização do schema da url encurtada: ${shortUrl.getUUID()}, 
				informações para atualizar: ${JSON.stringify({ hits })}`,
				},
			});
			await this.updateShortUrl.execute(shortUrl.getUUID(), { hits });
			this.eventManager.notify({
				eventName: EventNames.info,
				message: {
					where: 'AccessRootUrl',
					what: `Schema da url encurtada: ${shortUrl.getUUID()} atualizado com sucesso, 
				informações atualizadas: ${JSON.stringify({ hits })}`,
				},
			});
			this.eventManager.notify({
				eventName: EventNames.info,
				message: {
					where: 'AccessRootUrl',
					what: `Retornando a resposta: ${JSON.stringify({
						rootUrl: shortUrl.getRootUrl(),
					})}`,
				},
			});
			return HttpResponse.okWithBody({ rootUrl: shortUrl.getRootUrl() });
		} catch (error) {
			return HttpResponse.serverError();
		}
	}
}
