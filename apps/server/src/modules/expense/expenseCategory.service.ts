import { prisma } from '../../lib/prisma';
import { NotFoundError, ConflictError } from '../../lib/errors';

export class ExpenseCategoryService {
  async getAll() {
    return prisma.expenseCategory.findMany({ orderBy: { name: 'asc' } });
  }

  async getById(id: string) {
    const cat = await prisma.expenseCategory.findUnique({ where: { id }, include: { _count: { select: { expenses: true } } } });
    if (!cat) throw new NotFoundError('Expense category');
    return cat;
  }

  async create(data: { name: string; description?: string; budgetAmount?: number }) {
    const existing = await prisma.expenseCategory.findUnique({ where: { name: data.name } });
    if (existing) throw new ConflictError('Category name already exists');
    return prisma.expenseCategory.create({ data });
  }

  async update(id: string, data: { name?: string; description?: string; budgetAmount?: number; isActive?: boolean }) {
    await this.getById(id);
    return prisma.expenseCategory.update({ where: { id }, data });
  }

  async delete(id: string) {
    const cat = await this.getById(id);
    if ((cat._count as Record<string, number>).expenses > 0) {
      throw new ConflictError('Cannot delete category with expenses');
    }
    return prisma.expenseCategory.delete({ where: { id } });
  }
}

export const expenseCategoryService = new ExpenseCategoryService();