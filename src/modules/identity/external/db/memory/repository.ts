import { User } from '@modules/identity/domain/user';
import { IRepository } from '../IRepository';

export class Repository implements IRepository {
	shortenedUrls: User[] = [];

	public async delete(id: number): Promise<void> {
		throw new Error('Method not implemented.');
	}

	public async findAll(): Promise<User[]> {
		return this.shortenedUrls;
	}

	public async findByEmail(email: string): Promise<User | undefined> {
		return await this.shortenedUrls.find(item => item.getEmail() === email);
	}

	public async findById(id: number): Promise<User | undefined> {
		return await this.shortenedUrls.find(item => item.getId() === id);
	}

	public async save(entity: User): Promise<void> {
		this.shortenedUrls.push(entity);
	}

	public async update(id: number, entity: User): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
