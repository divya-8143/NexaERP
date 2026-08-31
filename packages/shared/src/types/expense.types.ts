export type ExpenseStatus = 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'REJECTED' | 'PAID';

export interface ExpenseCategory {
  id: string;
  name: string;
  description?: string;
  budgetAmount?: number;
  isActive: boolean;
  createdAt: Date;
}

export interface Expense {
  id: string;
  expenseNumber: string;
  title: string;
  description?: string;
  categoryId: string;
  category?: ExpenseCategory;
  amount: number;
  taxAmount: number;
  totalAmount: number;
  currency: string;
  expenseDate: Date;
  receiptUrl?: string;
  status: ExpenseStatus;
  submittedById: string;
  approvedById?: string;
  approvedAt?: Date;
  rejectionReason?: string;
  paidDate?: Date;
  paymentMethod?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}