import { invoiceSchema } from './invoice.schema.js';
import { invoiceRepository } from './invoice.repository.js';
import type { CarrierInput, Invoice, InvoiceFilters, InvoiceInput } from './invoice.types.js';
import { generateId, generateInvoiceNumber } from '../../lib/identifiers.js';

const calculateTotals = (input: InvoiceInput) => {
  const totalExcludingTax = input.items.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);
  const totalTaxable = input.items
    .filter((item) => item.taxType === 'taxable')
    .reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);

  const tax = Math.round(totalTaxable * input.taxRate * 100) / 100;
  const total = Math.round((totalExcludingTax + tax) * 100) / 100;

  return {
    total,
    tax,
    items: input.items.map((item) => ({
      ...item,
      lineAmount: Math.round(item.quantity * item.unitPrice * 100) / 100
    }))
  };
};

export class InvoiceService {
  async createInvoice(input: unknown): Promise<Invoice> {
    const parsed = invoiceSchema.parse(input);
    const { total, tax, items } = calculateTotals(parsed);
    const now = new Date();

    const invoice: Invoice = {
      ...parsed,
      id: generateId(),
      invoiceNumber: generateInvoiceNumber(),
      status: 'issued',
      totalAmount: total,
      totalTax: tax,
      items,
      createdAt: now,
      updatedAt: now
    };

    await invoiceRepository.create(invoice);
    return invoice;
  }

  async listInvoices(filters?: InvoiceFilters): Promise<Invoice[]> {
    return invoiceRepository.list(filters);
  }

  async getInvoice(id: string): Promise<Invoice | undefined> {
    return invoiceRepository.findById(id);
  }

  async verifyInvoice(invoiceNumber: string, randomCode: string): Promise<boolean> {
    // Simple verification stub that mimics the checksum behaviour.
    const invoice = await invoiceRepository.findByInvoiceNumber(invoiceNumber);
    if (!invoice) {
      return false;
    }

    return invoice.invoiceNumber.slice(-4) === randomCode;
  }

  async listCarriers(): Promise<CarrierInput[]> {
    return invoiceRepository.listCarriers();
  }

  async addCarrier(input: CarrierInput): Promise<void> {
    await invoiceRepository.addCarrier(input);
  }
}

export const invoiceService = new InvoiceService();
