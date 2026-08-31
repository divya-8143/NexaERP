import { prisma } from '../../lib/prisma';
import { NotFoundError, ConflictError } from '../../lib/errors';
import { CreateCustomerInput, UpdateCustomerInput } from '@nexaerp/shared';
import { getPaginationParams, createPaginatedResponse, getSkip } from '../../utils/pagination';

export class CustomerService {
  async getAll(query: Record<string, unknown>) {
    const params = getPaginationParams(query);
    const search = query.search as string | undefined;
    const isActive = query.isActive !== undefined ? query.isActive === 'true' : undefined;

    const where: Record<string, unknown> = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { code: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (isActive !== undefined) where.isActive = isActive;

    const [customers, total] = await Promise.all([
      prisma.customer.findMany({
        where,
        include: { _count: { select: { salesOrders: true } } },
        orderBy: { [params.sortBy]: params.sortOrder },
        skip: getSkip(params.page, params.limit),
        take: params.limit,
      }),
      prisma.customer.count({ where }),
    ]);

    return createPaginatedResponse(customers, total, params);
  }

  async getById(id: string) {
    const customer = await prisma.customer.findUnique({
      where: { id },
      include: {
        salesOrders: { orderBy: { createdAt: 'desc' }, take: 10 },
        _count: { select: { salesOrders: true, invoices: true } },
      },
    });
    if (!customer) throw new NotFoundError('Customer');
    return customer;
  }

  async create(data: CreateCustomerInput) {
    const existing = await prisma.customer.findUnique({ where: { code: data.code } });
    if (existing) throw new ConflictError('Customer code already exists');
    return prisma.customer.create({ data });
  }

  async update(id: string, data: UpdateCustomerInput) {
    await this.getById(id);
    if (data.code) {
      const existing = await prisma.customer.findFirst({ where: { code: data.code, NOT: { id } } });
      if (existing) throw new ConflictError('Customer code already exists');
    }
    return prisma.customer.update({ where: { id }, data });
  }

  async delete(id: string) {
    const customer = await this.getById(id);
    if ((customer._count as Record<string, number>).salesOrders > 0) {
      throw new ConflictError('Cannot delete customer with sales orders');
    }
    return prisma.customer.delete({ where: { id } });
  }
}

export const customerService = new CustomerService();