import { Router } from 'express';
import { z } from 'zod';

import { invoiceService } from './invoice.service.js';

const router = Router();

router.post('/', async (req, res, next) => {
  try {
    const invoice = await invoiceService.createInvoice(req.body);
    res.status(201).json(invoice);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const filtersSchema = z
      .object({
        status: z.enum(['draft', 'issued', 'transmitted', 'void']).optional(),
        orderId: z.string().optional(),
        from: z.string().datetime().optional(),
        to: z.string().datetime().optional()
      })
      .partial();

    const filters = filtersSchema.parse(req.query);

    const normalized = {
      ...filters,
      from: filters.from ? new Date(filters.from) : undefined,
      to: filters.to ? new Date(filters.to) : undefined
    };

    const invoices = await invoiceService.listInvoices(normalized);
    res.json(invoices);
  } catch (error) {
    next(error);
  }
});

router.get('/verify/:invoiceNumber/:randomCode', async (req, res, next) => {
  try {
    const { invoiceNumber, randomCode } = req.params;
    const isValid = await invoiceService.verifyInvoice(invoiceNumber, randomCode);
    res.json({ invoiceNumber, randomCode, valid: isValid });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const invoice = await invoiceService.getInvoice(req.params.id);
    if (!invoice) {
      res.status(404).json({ message: 'Invoice not found' });
      return;
    }
    res.json(invoice);
  } catch (error) {
    next(error);
  }
});

router.get('/carriers', async (_req, res, next) => {
  try {
    const carriers = await invoiceService.listCarriers();
    res.json(carriers);
  } catch (error) {
    next(error);
  }
});

router.post('/carriers', async (req, res, next) => {
  try {
    const schema = z.object({
      type: z.enum(['mobileBarcode', 'citizenDigitalCertificate', 'icCard', 'donation']),
      identifier: z.string().min(3).max(20)
    });
    const carrier = schema.parse(req.body);
    await invoiceService.addCarrier(carrier);
    res.status(201).json(carrier);
  } catch (error) {
    next(error);
  }
});

export const invoiceRouter = router;
