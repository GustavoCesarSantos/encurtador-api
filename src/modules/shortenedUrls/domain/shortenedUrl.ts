import { MissingParams } from '@shared/errors/missingParams';
import { Guard } from '@utils/guard';

type Constructor = {
	id?: number;
	ownerId: number;
	originalUrl: string;
	code: string;
	customCode?: string;
	qrCode?: string;
	accessCounter: number;
	lastAccess?: Date;
};

export class ShortenedUrl {
	private readonly id: number;
	private readonly ownerId: number;
	private readonly originalUrl: string;
	private readonly code: string;
	private readonly customCode?: string;
	private readonly qrCode?: string;
	private readonly accessCounter: number;
	private readonly lastAccess?: Date;
	private createdAt!: Date;
	private updatedAt!: Date;
	private removedAt!: Date;

	private constructor(props: Constructor) {
		this.id = props.id ?? 0;
		this.ownerId = props.ownerId;
		this.originalUrl = props.originalUrl;
		this.code = props.code;
		this.customCode = props.customCode ?? '';
		this.qrCode = props.qrCode ?? '';
		this.accessCounter = props.accessCounter;
		this.lastAccess = props.lastAccess;
	}

	public static create(props: Constructor) {
		const result = Guard.againstNaNOrUndefined([
			{ propName: 'Owner ID', value: props.ownerId },
			{ propName: 'Access counter', value: props.accessCounter },
		]);
		const result2 = Guard.againstEmptyOrUndefined([
			{ propName: 'Original url', value: props.originalUrl },
			{ propName: 'Code', value: props.code },
		]);
		if (!result.isSuccess || !result2.isSuccess) {
			return new MissingParams(
				`${[...result.isError, ...result2.isError]}`,
			);
		}
		return new ShortenedUrl(props);
	}

	public getAccessCounter(): number {
		const counter = this.accessCounter;
		return counter;
	}

	public getCode(): string {
		const code = this.code;
		return code;
	}

	public getCreatedDate(): Date {
		const createdAt = this.createdAt;
		return createdAt;
	}

	public getCustomCode(): string | undefined {
		const customCode = this.customCode;
		return customCode;
	}

	public getId(): number {
		const id = this.id;
		return id;
	}

	public getLastAccess(): Date | undefined {
		const lastAccess = this.lastAccess;
		return lastAccess;
	}

	public getOriginalUrl(): string {
		const originalUrl = this.originalUrl;
		return originalUrl;
	}

	public getOwnerId(): number {
		const ownerId = this.ownerId;
		return ownerId;
	}

	public getQrCode(): string | undefined {
		const qrCode = this.qrCode;
		return qrCode;
	}

	public getUpdatedDate(): Date {
		const updatedAt = this.updatedAt;
		return updatedAt;
	}

	public getRemovedDate(): Date {
		const removedAt = this.removedAt;
		return removedAt;
	}

	public setCreateDate(): void {
		this.createdAt = new Date();
	}

	public setUpdateDate(): void {
		this.updatedAt = new Date();
	}

	public setRemoveDate(): void {
		this.removedAt = new Date();
	}
}
