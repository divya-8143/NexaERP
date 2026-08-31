import { z } from 'zod';

export const CreateExpenseCategorySchema = z.object({
  name: z.string().min(1, 'Category name is required').max(100),
  description: z.string().optional(),
  budgetAmount: z.number().min(0).optional(),
});

export const CreateExpenseSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().optional(),
  categoryId: z.string().uuid('Invalid category ID'),
  amount: z.number().positive('Amount must be positive'),
  taxAmount: z.number().min(0).default(0),
  currency: z.string().length(3, 'Currency must be 3 characters').default('USD'),
  expenseDate: z.string().datetime(),
  receiptUrl: z.string().url().optional(),
  notes: z.string().optional(),
  paymentMethod: z.string().optional(),
});

export const ApproveExpenseSchema = z.object({
  notes: z.string().optional(),
});

export const RejectExpenseSchema = z.object({
  rejectionReason: z.string().min(1, 'Rejection reason is required'),
});

export type CreateExpenseCategoryInput = z.infer<typeof CreateExpenseCategorySchema>;
export type CreateExpenseInput = z.infer<typeof CreateExpenseSchema>;
export type ApproveExpenseInput = z.infer<typeof ApproveExpenseSchema>;
export type RejectExpenseInput = z.infer<typeof RejectExpenseSchema>;