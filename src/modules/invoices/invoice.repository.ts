import { isAfter, isBefore } from 'date-fns';

import type { CarrierInput, Invoice, InvoiceFilters, InvoiceRepository } from './invoice.types.js';

export class InMemoryInvoiceRepository implements InvoiceRepository {
  #invoices: Invoice[] = [];
  #carriers: CarrierInput[] = [];

  async create(invoice: Invoice): Promise<Invoice> {
    this.#invoices.push(invoice);
    return invoice;
  }

  async update(invoice: Invoice): Promise<Invoice> {
    const index = this.#invoices.findIndex((item) => item.id === invoice.id);
    if (index === -1) {
      throw new Error('Invoice not found');
    }
    this.#invoices[index] = invoice;
    return invoice;
  }

  async list(filters?: InvoiceFilters): Promise<Invoice[]> {
    if (!filters) {
      return [...this.#invoices];
    }

    return this.#invoices.filter((invoice) => {
      if (filters.status && invoice.status !== filters.status) {
        return false;
      }
      if (filters.orderId && invoice.orderId !== filters.orderId) {
        return false;
      }
      if (filters.from && isBefore(invoice.issueDate, filters.from)) {
        return false;
      }
      if (filters.to && isAfter(invoice.issueDate, filters.to)) {
        return false;
      }
      return true;
    });
  }

  async findById(id: string): Promise<Invoice | undefined> {
    return this.#invoices.find((invoice) => invoice.id === id);
  }

  async findByInvoiceNumber(invoiceNumber: string): Promise<Invoice | undefined> {
    return this.#invoices.find((invoice) => invoice.invoiceNumber === invoiceNumber);
  }

  async listCarriers(): Promise<CarrierInput[]> {
    return [...this.#carriers];
  }

  async addCarrier(carrier: CarrierInput): Promise<void> {
    this.#carriers.push(carrier);
  }

  clear(): void {
    this.#invoices = [];
    this.#carriers = [];
  }
}

export const invoiceRepository = new InMemoryInvoiceRepository();
