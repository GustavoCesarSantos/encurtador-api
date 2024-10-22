type propsList = {
	propName: string;
	value: string | number | undefined | null;
};

type Result = {
	isSuccess: boolean;
	isError: string[];
};

export class Guard {
	static againstEmptyOrUndefined(propsList: propsList[]): Result {
		const props: string[] = propsList.reduce(
			(acc: string[], cur: propsList) => {
				switch (cur.value) {
					case undefined:
						acc.push(cur.propName);
						break;
					case null:
						acc.push(cur.propName);
						break;
					case '':
						acc.push(cur.propName);
						break;
					default:
						break;
				}
				return acc;
			},
			[],
		);
		if (props.length > 0) return { isSuccess: false, isError: props };
		return { isSuccess: true, isError: [] };
	}

	static againstNaNOrUndefined(propsList: propsList[]): Result {
		const props: string[] = propsList.reduce(
			(acc: string[], cur: propsList) => {
				switch (true) {
					case cur.value === undefined:
						acc.push(cur.propName);
						break;
					case cur.value === null:
						acc.push(cur.propName);
						break;
					case typeof cur.value !== 'number':
						acc.push(cur.propName);
						break;
					case isNaN(cur.value as number):
						acc.push(cur.propName);
						break;
					default:
						break;
				}
				return acc;
			},
			[],
		);
		if (props.length > 0) return { isSuccess: false, isError: props };
		return { isSuccess: true, isError: [] };
	}
}
