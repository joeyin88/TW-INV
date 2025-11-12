import crypto from 'node:crypto';

const INVOICE_PREFIXES = ['AA', 'AB', 'AC', 'AD', 'AE', 'AF', 'AG', 'AH'];

export const generateInvoiceNumber = (): string => {
  const prefix = INVOICE_PREFIXES[Math.floor(Math.random() * INVOICE_PREFIXES.length)];
  const number = Math.floor(Math.random() * 1_000_00000)
    .toString()
    .padStart(8, '0');
  return `${prefix}${number}`;
};

export const generateId = (): string => crypto.randomUUID();
