import { beforeEach, describe, expect, it } from 'vitest';

import { invoiceRepository } from './invoice.repository.js';
import { invoiceService } from './invoice.service.js';

const sampleInvoice = {
  orderId: 'ORDER-123',
  issueDate: new Date().toISOString(),
  buyer: {
    name: '測試公司',
    taxId: '12345678',
    email: 'test@example.com'
  },
  items: [
    { description: '商品A', quantity: 2, unitPrice: 100, taxType: 'taxable' },
    { description: '商品B', quantity: 1, unitPrice: 50, taxType: 'zero' }
  ],
  taxRate: 0.05
};

describe('InvoiceService', () => {
  beforeEach(() => {
    invoiceRepository.clear();
  });

  it('should create invoice with totals', async () => {
    const invoice = await invoiceService.createInvoice(sampleInvoice);

    expect(invoice.totalAmount).toBeCloseTo(262.5, 1);
    expect(invoice.totalTax).toBeCloseTo(10, 1);
    expect(invoice.items[0].lineAmount).toBe(200);
  });

  it('should verify invoice by random code using suffix', async () => {
    const invoice = await invoiceService.createInvoice(sampleInvoice);
    const randomCode = invoice.invoiceNumber.slice(-4);

    const result = await invoiceService.verifyInvoice(invoice.invoiceNumber, randomCode);

    expect(result).toBe(true);
  });
});
