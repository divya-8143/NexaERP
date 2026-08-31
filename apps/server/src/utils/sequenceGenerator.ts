import { prisma } from '../lib/prisma';

function pad(n: number, digits: number): string {
  return String(n).padStart(digits, '0');
}

function getYearMonth(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = pad(now.getMonth() + 1, 2);
  return `${year}${month}`;
}

export async function generatePONumber(): Promise<string> {
  const count = await prisma.purchaseOrder.count();
  return `PO-${getYearMonth()}-${pad(count + 1, 4)}`;
}

export async function generateSONumber(): Promise<string> {
  const count = await prisma.salesOrder.count();
  return `SO-${getYearMonth()}-${pad(count + 1, 4)}`;
}

export async function generateInvoiceNumber(type: 'SALES' | 'PURCHASE'): Promise<string> {
  const prefix = type === 'SALES' ? 'INV' : 'BILL';
  const count = await prisma.invoice.count({ where: { type } });
  return `${prefix}-${getYearMonth()}-${pad(count + 1, 4)}`;
}

export async function generateGRNNumber(): Promise<string> {
  const count = await prisma.goodsReceipt.count();
  return `GRN-${getYearMonth()}-${pad(count + 1, 4)}`;
}

export async function generateExpenseNumber(): Promise<string> {
  const count = await prisma.expense.count();
  return `EXP-${getYearMonth()}-${pad(count + 1, 4)}`;
}

export async function generateQuoteNumber(): Promise<string> {
  const count = await prisma.quotation.count();
  return `QUO-${getYearMonth()}-${pad(count + 1, 4)}`;
}

export async function generateEmployeeCode(deptName: string): Promise<string> {
  const count = await prisma.employee.count();
  const prefix = deptName.toUpperCase().substring(0, 3);
  return `EMP-${prefix}-${pad(count + 1, 4)}`;
}