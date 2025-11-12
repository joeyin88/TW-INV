import { Router } from 'express';

import { accountService } from './account.service.js';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const accounts = await accountService.listAccounts();
    res.json(accounts);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const account = await accountService.createAccount(req.body);
    res.status(201).json(account);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const account = await accountService.getAccount(req.params.id);
    if (!account) {
      res.status(404).json({ message: 'Account not found' });
      return;
    }
    res.json(account);
  } catch (error) {
    next(error);
  }
});

export const accountRouter = router;
