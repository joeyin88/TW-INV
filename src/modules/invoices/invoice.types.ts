import type { CarrierInput, InvoiceInput, InvoiceItemInput } from './invoice.schema.js';

export type InvoiceStatus = 'draft' | 'issued' | 'transmitted' | 'void';

export interface InvoiceItem extends InvoiceItemInput {
  lineAmount: number;
}

export interface Invoice extends InvoiceInput {
  id: string;
  invoiceNumber: string;
  status: InvoiceStatus;
  totalAmount: number;
  totalTax: number;
  items: InvoiceItem[];
  createdAt: Date;
  updatedAt: Date;
}

export type InvoiceSummary = Pick<Invoice, 'id' | 'invoiceNumber' | 'orderId' | 'status' | 'issueDate' | 'totalAmount' | 'totalTax'>;

export type InvoiceFilters = Partial<{ status: InvoiceStatus; orderId: string; from: Date; to: Date }>;

export interface InvoiceRepository {
  create(invoice: Invoice): Promise<Invoice>;
  update(invoice: Invoice): Promise<Invoice>;
  list(filters?: InvoiceFilters): Promise<Invoice[]>;
  findById(id: string): Promise<Invoice | undefined>;
  findByInvoiceNumber(invoiceNumber: string): Promise<Invoice | undefined>;
}

