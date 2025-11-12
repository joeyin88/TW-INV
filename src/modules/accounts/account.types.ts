import type { AccountInput } from './account.schema.js';

export interface Account extends AccountInput {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AccountRepository {
  list(): Promise<Account[]>;
  create(account: Account): Promise<Account>;
  findById(id: string): Promise<Account | undefined>;
}
