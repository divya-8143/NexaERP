import { z } from 'zod';

export const CreateInvoiceSchema = z.object({
  type: z.enum(['SALES', 'PURCHASE']),
  customerId: z.string().uuid().optional(),
  supplierId: z.string().uuid().optional(),
  salesOrderId: z.string().uuid().optional(),
  purchaseOrderId: z.string().uuid().optional(),
  issueDate: z.string().datetime(),
  dueDate: z.string().datetime(),
  items: z
    .array(
      z.object({
        description: z.string().min(1, 'Description is required'),
        quantity: z.number().positive(),
        unitPrice: z.number().min(0),
        discount: z.number().min(0).max(100).default(0),
        taxRate: z.number().min(0).max(100).default(0),
      })
    )
    .min(1, 'At least one item is required'),
  notes: z.string().optional(),
  termsAndConditions: z.string().optional(),
});

export const RecordPaymentSchema = z.object({
  invoiceId: z.string().uuid('Invalid invoice ID'),
  amount: z.number().positive('Amount must be positive'),
  paymentDate: z.string().datetime(),
  paymentMethod: z.enum(['CASH', 'BANK_TRANSFER', 'CHEQUE', 'CREDIT_CARD', 'UPI', 'OTHER']),
  referenceNumber: z.string().optional(),
  notes: z.string().optional(),
});

export type CreateInvoiceInput = z.infer<typeof CreateInvoiceSchema>;
export type RecordPaymentInput = z.infer<typeof RecordPaymentSchema>;