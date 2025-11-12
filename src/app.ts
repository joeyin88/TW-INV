import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { accountRouter } from './modules/accounts/account.routes.js';
import { invoiceRouter } from './modules/invoices/invoice.routes.js';

export const createApp = () => {
  const app = express();

  app.use(helmet());
  app.use(express.json());
  app.use(morgan('dev'));

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/api/accounts', accountRouter);
  app.use('/api/invoices', invoiceRouter);

  app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
      return;
    }

    res.status(500).json({ message: 'Unexpected error' });
  });

  return app;
};
