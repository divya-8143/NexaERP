import { prisma } from '../../lib/prisma';
import { NotFoundError, ConflictError } from '../../lib/errors';
import { getPaginationParams, createPaginatedResponse, getSkip } from '../../utils/pagination';

export class DepartmentService {
  async getAll(query: Record<string, unknown>) {
    const params = getPaginationParams(query);
    const [departments, total] = await Promise.all([
      prisma.department.findMany({
        include: { _count: { select: { employees: true } } },
        orderBy: { name: 'asc' },
        skip: getSkip(params.page, params.limit),
        take: params.limit,
      }),
      prisma.department.count(),
    ]);
    return createPaginatedResponse(departments, total, params);
  }

  async getById(id: string) {
    const dept = await prisma.department.findUnique({
      where: { id },
      include: { employees: true, _count: { select: { employees: true } } },
    });
    if (!dept) throw new NotFoundError('Department');
    return dept;
  }

  async create(data: { name: string; description?: string; managerId?: string }) {
    const existing = await prisma.department.findUnique({ where: { name: data.name } });
    if (existing) throw new ConflictError('Department name already exists');
    return prisma.department.create({ data });
  }

  async update(id: string, data: { name?: string; description?: string; managerId?: string }) {
    await this.getById(id);
    return prisma.department.update({ where: { id }, data });
  }

  async delete(id: string) {
    const dept = await this.getById(id);
    if ((dept._count as Record<string, number>).employees > 0) {
      throw new ConflictError('Cannot delete department with employees');
    }
    return prisma.department.delete({ where: { id } });
  }
}

export const departmentService = new DepartmentService();