import { z } from 'zod';

export const CreateCustomerSchema = z.object({
  name: z.string().min(1, 'Customer name is required').max(200),
  code: z.string().min(1, 'Customer code is required').max(20),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  postalCode: z.string().optional(),
  taxNumber: z.string().optional(),
  creditLimit: z.number().min(0).optional(),
  paymentTerms: z.number().min(0).optional(),
  notes: z.string().optional(),
});

export const UpdateCustomerSchema = CreateCustomerSchema.partial();

export const CreateSalesOrderSchema = z.object({
  customerId: z.string().uuid('Invalid customer ID'),
  expectedDeliveryDate: z.string().datetime().optional(),
  items: z
    .array(
      z.object({
        productId: z.string().uuid('Invalid product ID'),
        description: z.string().optional(),
        quantity: z.number().positive('Quantity must be positive'),
        unitPrice: z.number().min(0, 'Unit price must be non-negative'),
        discount: z.number().min(0).max(100).default(0),
        taxRate: z.number().min(0).max(100).default(0),
      })
    )
    .min(1, 'At least one item is required'),
  shippingCost: z.number().min(0).default(0),
  shippingAddress: z.string().optional(),
  notes: z.string().optional(),
});

export const UpdateSalesOrderSchema = CreateSalesOrderSchema.partial();

export const CreateQuotationSchema = z.object({
  customerId: z.string().uuid('Invalid customer ID'),
  validUntil: z.string().datetime(),
  items: z
    .array(
      z.object({
        productId: z.string().uuid(),
        description: z.string().optional(),
        quantity: z.number().positive(),
        unitPrice: z.number().min(0),
        discount: z.number().min(0).max(100).default(0),
        taxRate: z.number().min(0).max(100).default(0),
      })
    )
    .min(1),
  notes: z.string().optional(),
});

export type CreateCustomerInput = z.infer<typeof CreateCustomerSchema>;
export type UpdateCustomerInput = z.infer<typeof UpdateCustomerSchema>;
export type CreateSalesOrderInput = z.infer<typeof CreateSalesOrderSchema>;
export type UpdateSalesOrderInput = z.infer<typeof UpdateSalesOrderSchema>;
export type CreateQuotationInput = z.infer<typeof CreateQuotationSchema>;