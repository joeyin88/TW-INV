import { z } from 'zod';

export const invoiceItemSchema = z.object({
  description: z.string().min(1),
  quantity: z.number().positive(),
  unitPrice: z.number().nonnegative(),
  taxType: z.enum(['taxable', 'zero', 'exempt']).default('taxable')
});

export const carrierSchema = z.object({
  type: z.enum(['mobileBarcode', 'citizenDigitalCertificate', 'icCard', 'donation']),
  identifier: z.string().min(3).max(20)
});

export const buyerSchema = z.object({
  name: z.string().min(1),
  taxId: z.string().length(8).optional(),
  email: z.string().email().optional()
});

export const invoiceSchema = z.object({
  orderId: z.string().min(1),
  issueDate: z.coerce.date(),
  currency: z.enum(['TWD']).default('TWD'),
  buyer: buyerSchema,
  carrier: carrierSchema.optional(),
  items: z.array(invoiceItemSchema).min(1),
  taxRate: z.number().nonnegative().max(1).default(0.05),
  remark: z.string().max(120).optional()
});

export type InvoiceInput = z.infer<typeof invoiceSchema>;
export type InvoiceItemInput = z.infer<typeof invoiceItemSchema>;
export type CarrierInput = z.infer<typeof carrierSchema>;
