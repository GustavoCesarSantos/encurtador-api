import { hash } from 'bcrypt';

import { variables } from '@shared/envs';
import { MissingParams } from '@shared/errors/missingParams';
import { Guard } from '@utils/guard';

type Constructor = {
	id?: number;
	name: string;
	email: string;
	password: string;
	active?: boolean;
	authTokenVersion?: number;
};

export class User {
	private readonly id: number;
	private readonly name: string;
	private readonly email: string;
	private password: string;
	private readonly active: boolean;
	private authTokenVersion: number;
	private createdAt!: Date;
	private updatedAt!: Date;
	private removedAt!: Date;

	private constructor(props: Constructor) {
		this.id = props.id ?? 0;
		this.name = props.name;
		this.email = props.email;
		this.password = props.password;
		this.active = props.active ?? true;
		this.authTokenVersion = props.authTokenVersion ?? 0;
	}

	public static create(props: Constructor) {
		const result = Guard.againstEmptyOrUndefined([
			{ propName: 'Name', value: props.name },
			{ propName: 'Email', value: props.email },
			{ propName: 'Password', value: props.password },
		]);
		const result2 = Guard.againstInvalidEmail(props.email);
		if (!result.isSuccess || !result2.isSuccess) {
			return new MissingParams(
				`${[...result.isError, ...result2.isError]}`,
			);
		}
		return new User(props);
	}

	public getActive(): boolean {
		const active = this.active;
		return active;
	}

	public getAuthTokenVersion(): number {
		const authTokenVersion = this.authTokenVersion;
		return authTokenVersion;
	}

	public getCreatedDate(): Date {
		const createdAt = this.createdAt;
		return createdAt;
	}

	public getEmail(): string {
		const email = this.email;
		return email;
	}

	public getId(): number {
		const id = this.id;
		return id;
	}

	public getName(): string {
		const name = this.name;
		return name;
	}

	public getPassword(): string {
		const password = this.password;
		return password;
	}

	public getUpdatedDate(): Date {
		const updatedAt = this.updatedAt;
		return updatedAt;
	}

	public incrementAuthTokenVersion(): void {
		this.authTokenVersion++;
	}

	public setCreateDate(): void {
		this.createdAt = new Date();
	}

	public async setHashPassword(rawPassword: string): Promise<void> {
		this.password = await hash(rawPassword, variables.password_hash_salt);
	}

	public setUpdateDate(): void {
		this.updatedAt = new Date();
	}

	public setRemoveDate(): void {
		this.removedAt = new Date();
	}
}
