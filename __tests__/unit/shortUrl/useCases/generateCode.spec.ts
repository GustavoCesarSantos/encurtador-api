import { IEventManager } from '@infra/listeners/eventManager';
import { IListener, Payload } from '@infra/listeners/listener';
import {
	GenerateCode,
	IGenerateCode,
} from '@modules/shortUrls/useCases/generateCode';

let generateCode: IGenerateCode;

class EventManagerDummy implements IEventManager {
	attach(eventName: string, listeners: IListener[]): void {
		return;
	}
	notify(payload: Payload): void {
		return;
	}
}

const makeSut = (): GenerateCode => {
	const eventManagerDummy = new EventManagerDummy();
	return new GenerateCode(eventManagerDummy);
};

describe('Generate code', () => {
	beforeEach(() => {
		generateCode = makeSut();
	});

	test('Should generate a code with five characters long', () => {
		expect(generateCode.execute()).toHaveLength(5);
	});
});
