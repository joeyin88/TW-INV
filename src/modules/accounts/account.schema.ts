import { z } from 'zod';

export const roleSchema = z.enum(['owner', 'manager', 'accountant', 'staff']);

export const accountSchema = z.object({
  name: z.string().min(1),
  taxId: z.string().length(8),
  email: z.string().email(),
  phone: z.string().min(8),
  address: z.string().min(1),
  roles: z.array(roleSchema).min(1)
});

export type AccountInput = z.infer<typeof accountSchema>;
export type Role = z.infer<typeof roleSchema>;
