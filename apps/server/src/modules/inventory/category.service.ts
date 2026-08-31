import { prisma } from '../../lib/prisma';
import { NotFoundError, ConflictError } from '../../lib/errors';
import { CreateCategoryInput, UpdateCategoryInput } from '@nexaerp/shared';

export class CategoryService {
  async getAll() {
    return prisma.category.findMany({
      include: {
        children: true,
        _count: { select: { products: true } },
      },
      orderBy: { name: 'asc' },
    });
  }

  async getById(id: string) {
    const category = await prisma.category.findUnique({
      where: { id },
      include: { children: true, products: true },
    });
    if (!category) throw new NotFoundError('Category');
    return category;
  }

  async create(data: CreateCategoryInput) {
    const existing = await prisma.category.findUnique({ where: { name: data.name } });
    if (existing) throw new ConflictError('Category name already exists');

    return prisma.category.create({ data });
  }

  async update(id: string, data: UpdateCategoryInput) {
    await this.getById(id);
    if (data.name) {
      const existing = await prisma.category.findFirst({ where: { name: data.name, NOT: { id } } });
      if (existing) throw new ConflictError('Category name already exists');
    }

    return prisma.category.update({ where: { id }, data });
  }

  async delete(id: string) {
    await this.getById(id);
    const hasProducts = await prisma.product.count({ where: { categoryId: id } });
    if (hasProducts > 0) throw new ConflictError('Cannot delete category with associated products');

    return prisma.category.delete({ where: { id } });
  }
}

export const categoryService = new CategoryService();