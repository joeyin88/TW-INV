import { beforeEach, describe, expect, it } from 'vitest';

import { accountRepository } from './account.repository.js';
import { accountService } from './account.service.js';

const sampleAccount = {
  name: '示範企業',
  taxId: '87654321',
  email: 'owner@example.com',
  phone: '0223456789',
  address: '台北市中正區仁愛路一段1號',
  roles: ['owner', 'accountant']
};

describe('AccountService', () => {
  beforeEach(() => {
    accountRepository.clear();
  });

  it('creates account and assigns metadata', async () => {
    const account = await accountService.createAccount(sampleAccount);

    expect(account.id).toBeDefined();
    expect(account.createdAt).toBeInstanceOf(Date);
    expect(account.roles).toContain('owner');
  });
});
