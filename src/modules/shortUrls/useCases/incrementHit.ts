export interface IIncrementHit {
	execute(hit: number): number;
}

export class IncrementHit implements IIncrementHit {
	execute(hit: number): number {
		return hit + 1;
	}
}
