import { prisma } from '../../lib/prisma';
import { NotFoundError, AppError } from '../../lib/errors';
import { CreateExpenseInput } from '@nexaerp/shared';
import { generateExpenseNumber } from '../../utils/sequenceGenerator';
import { getPaginationParams, createPaginatedResponse, getSkip } from '../../utils/pagination';

export class ExpenseService {
  async getAll(query: Record<string, unknown>) {
    const params = getPaginationParams(query);
    const status = query.status as string | undefined;
    const submittedById = query.submittedById as string | undefined;

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (submittedById) where.submittedById = submittedById;

    const [expenses, total] = await Promise.all([
      prisma.expense.findMany({
        where,
        include: {
          category: true,
          submittedBy: { select: { firstName: true, lastName: true } },
          approvedBy: { select: { firstName: true, lastName: true } },
        },
        orderBy: { [params.sortBy]: params.sortOrder },
        skip: getSkip(params.page, params.limit),
        take: params.limit,
      }),
      prisma.expense.count({ where }),
    ]);

    return createPaginatedResponse(expenses, total, params);
  }

  async getById(id: string) {
    const expense = await prisma.expense.findUnique({
      where: { id },
      include: {
        category: true,
        submittedBy: { select: { firstName: true, lastName: true, email: true } },
        approvedBy: { select: { firstName: true, lastName: true } },
      },
    });
    if (!expense) throw new NotFoundError('Expense');
    return expense;
  }

  async create(data: CreateExpenseInput, submittedById: string) {
    const category = await prisma.expenseCategory.findUnique({ where: { id: data.categoryId } });
    if (!category) throw new NotFoundError('Expense category');

    const expenseNumber = await generateExpenseNumber();
    const totalAmount = data.amount + (data.taxAmount || 0);

    return prisma.expense.create({
      data: {
        expenseNumber,
        title: data.title,
        description: data.description,
        categoryId: data.categoryId,
        amount: data.amount,
        taxAmount: data.taxAmount || 0,
        totalAmount,
        currency: data.currency || 'USD',
        expenseDate: new Date(data.expenseDate),
        receiptUrl: data.receiptUrl,
        notes: data.notes,
        paymentMethod: data.paymentMethod,
        submittedById,
      },
      include: { category: true },
    });
  }

  async submit(id: string, userId: string) {
    const expense = await this.getById(id);
    if (expense.submittedById !== userId) throw new AppError('Not authorized', 403);
    if (expense.status !== 'DRAFT') throw new AppError('Only draft expenses can be submitted', 400);
    return prisma.expense.update({ where: { id }, data: { status: 'SUBMITTED' } });
  }

  async approve(id: string, approvedById: string) {
    const expense = await this.getById(id);
    if (expense.status !== 'SUBMITTED') throw new AppError('Only submitted expenses can be approved', 400);
    return prisma.expense.update({ where: { id }, data: { status: 'APPROVED', approvedById, approvedAt: new Date() } });
  }

  async reject(id: string, approvedById: string, reason: string) {
    const expense = await this.getById(id);
    if (expense.status !== 'SUBMITTED') throw new AppError('Only submitted expenses can be rejected', 400);
    return prisma.expense.update({ where: { id }, data: { status: 'REJECTED', approvedById, approvedAt: new Date(), rejectionReason: reason } });
  }

  async markPaid(id: string) {
    const expense = await this.getById(id);
    if (expense.status !== 'APPROVED') throw new AppError('Only approved expenses can be marked as paid', 400);
    return prisma.expense.update({ where: { id }, data: { status: 'PAID', paidDate: new Date() } });
  }
}

export const expenseService = new ExpenseService();