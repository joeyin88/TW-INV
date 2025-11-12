import type { Account, AccountRepository } from './account.types.js';

export class InMemoryAccountRepository implements AccountRepository {
  #accounts: Account[] = [];

  async list(): Promise<Account[]> {
    return [...this.#accounts];
  }

  async create(account: Account): Promise<Account> {
    this.#accounts.push(account);
    return account;
  }

  async findById(id: string): Promise<Account | undefined> {
    return this.#accounts.find((account) => account.id === id);
  }

  clear(): void {
    this.#accounts = [];
  }
}

export const accountRepository = new InMemoryAccountRepository();
