import { prisma } from '../../lib/prisma';
import { NotFoundError, ConflictError } from '../../lib/errors';
import { CreateSupplierInput, UpdateSupplierInput } from '@nexaerp/shared';
import { getPaginationParams, createPaginatedResponse, getSkip } from '../../utils/pagination';

export class SupplierService {
  async getAll(query: Record<string, unknown>) {
    const params = getPaginationParams(query);
    const search = query.search as string | undefined;
    const status = query.status as string | undefined;

    const where: Record<string, unknown> = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { code: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (status) where.status = status;

    const [suppliers, total] = await Promise.all([
      prisma.supplier.findMany({
        where,
        include: { _count: { select: { purchaseOrders: true } } },
        orderBy: { [params.sortBy]: params.sortOrder },
        skip: getSkip(params.page, params.limit),
        take: params.limit,
      }),
      prisma.supplier.count({ where }),
    ]);

    return createPaginatedResponse(suppliers, total, params);
  }

  async getById(id: string) {
    const supplier = await prisma.supplier.findUnique({
      where: { id },
      include: {
        supplierProducts: { include: { product: true } },
        _count: { select: { purchaseOrders: true } },
      },
    });
    if (!supplier) throw new NotFoundError('Supplier');
    return supplier;
  }

  async create(data: CreateSupplierInput) {
    const existing = await prisma.supplier.findUnique({ where: { code: data.code } });
    if (existing) throw new ConflictError('Supplier code already exists');
    return prisma.supplier.create({ data });
  }

  async update(id: string, data: UpdateSupplierInput) {
    await this.getById(id);
    if (data.code) {
      const existing = await prisma.supplier.findFirst({ where: { code: data.code, NOT: { id } } });
      if (existing) throw new ConflictError('Supplier code already exists');
    }
    return prisma.supplier.update({ where: { id }, data });
  }

  async delete(id: string) {
    const supplier = await this.getById(id);
    const poCount = (supplier._count as Record<string, number>).purchaseOrders;
    if (poCount > 0) throw new ConflictError('Cannot delete supplier with associated purchase orders');
    return prisma.supplier.delete({ where: { id } });
  }

  async addProduct(supplierId: string, data: { productId: string; supplierSku?: string; supplierPrice: number; leadTimeDays?: number; minOrderQuantity?: number; isPreferred?: boolean }) {
    await this.getById(supplierId);
    const product = await prisma.product.findUnique({ where: { id: data.productId } });
    if (!product) throw new NotFoundError('Product');

    const existing = await prisma.supplierProduct.findUnique({
      where: { supplierId_productId: { supplierId, productId: data.productId } },
    });
    if (existing) throw new ConflictError('Product already linked to this supplier');

    return prisma.supplierProduct.create({ data: { ...data, supplierId }, include: { product: true } });
  }

  async updateRating(id: string, rating: number) {
    await this.getById(id);
    return prisma.supplier.update({ where: { id }, data: { rating } });
  }
}

export const supplierService = new SupplierService();