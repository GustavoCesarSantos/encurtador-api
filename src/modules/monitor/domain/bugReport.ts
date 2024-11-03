import { MissingParams } from '@shared/errors/missingParams';
import { Guard } from '@utils/guard';

type Constructor = {
	id?: number;
	email: string;
	description: string;
	status?: string;
};

export class BugReport {
	private readonly id: number;
	private readonly email: string;
	private readonly description: string;
	private readonly status: string;
	private createdAt!: Date;

	private constructor(props: Constructor) {
		this.id = props.id ?? 0;
		this.email = props.email;
		this.description = props.description;
		this.status = props.status ?? 'awaiting correction';
	}

	public static create(props: Constructor) {
		const result = Guard.againstEmptyOrUndefined([
			{ propName: 'Email', value: props.email },
			{ propName: 'Description', value: props.description },
		]);
		if (!result.isSuccess) {
			return new MissingParams(`${result.isError}`);
		}
		return new BugReport(props);
	}

	public getCreatedDate(): Date {
		const createdAt = this.createdAt;
		return createdAt;
	}

	public getDescription(): string {
		const description = this.description;
		return description;
	}

	public getEmail(): string {
		const email = this.email;
		return email;
	}

	public getId(): number {
		const id = this.id;
		return id;
	}

	public getStatus(): string {
		const status = this.status;
		return status;
	}

	public setCreateDate(): void {
		this.createdAt = new Date();
	}
}
