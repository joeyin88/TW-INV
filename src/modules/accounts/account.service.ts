import { accountSchema } from './account.schema.js';
import { accountRepository } from './account.repository.js';
import type { Account } from './account.types.js';
import { generateId } from '../../lib/identifiers.js';

export class AccountService {
  async listAccounts(): Promise<Account[]> {
    return accountRepository.list();
  }

  async createAccount(input: unknown): Promise<Account> {
    const parsed = accountSchema.parse(input);
    const now = new Date();
    const account: Account = {
      ...parsed,
      id: generateId(),
      createdAt: now,
      updatedAt: now
    };

    await accountRepository.create(account);
    return account;
  }

  async getAccount(id: string): Promise<Account | undefined> {
    return accountRepository.findById(id);
  }
}

export const accountService = new AccountService();
