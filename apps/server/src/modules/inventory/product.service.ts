import { prisma } from '../../lib/prisma';
import { NotFoundError, ConflictError } from '../../lib/errors';
import { CreateProductInput, UpdateProductInput } from '@nexaerp/shared';
import { getPaginationParams, createPaginatedResponse, getSkip } from '../../utils/pagination';

export class ProductService {
  async getAll(query: Record<string, unknown>) {
    const params = getPaginationParams(query);
    const search = query.search as string | undefined;
    const categoryId = query.categoryId as string | undefined;
    const isActive = query.isActive !== undefined ? query.isActive === 'true' : undefined;

    const where: Record<string, unknown> = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { sku: { contains: search, mode: 'insensitive' } },
        { barcode: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (categoryId) where.categoryId = categoryId;
    if (isActive !== undefined) where.isActive = isActive;

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true,
          inventory: true,
          _count: { select: { variants: true } },
        },
        orderBy: { [params.sortBy]: params.sortOrder },
        skip: getSkip(params.page, params.limit),
        take: params.limit,
      }),
      prisma.product.count({ where }),
    ]);

    return createPaginatedResponse(products, total, params);
  }

  async getById(id: string) {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true, variants: true, inventory: true },
    });
    if (!product) throw new NotFoundError('Product');
    return product;
  }

  async getBySku(sku: string) {
    const product = await prisma.product.findUnique({ where: { sku }, include: { category: true, inventory: true } });
    if (!product) throw new NotFoundError('Product');
    return product;
  }

  async create(data: CreateProductInput) {
    const existing = await prisma.product.findUnique({ where: { sku: data.sku } });
    if (existing) throw new ConflictError('SKU already exists');

    const { minStockLevel, maxStockLevel, reorderPoint, reorderQuantity, ...productData } = data;

    return prisma.$transaction(async (tx: any) => {
      const product = await tx.product.create({
        data: productData,
        include: { category: true },
      });

      await tx.inventory.create({
        data: {
          productId: product.id,
          quantityOnHand: 0,
          quantityReserved: 0,
          minStockLevel: minStockLevel ?? 0,
          maxStockLevel: maxStockLevel ?? null,
          reorderPoint: reorderPoint ?? 0,
          reorderQuantity: reorderQuantity ?? 0,
        },
      });

      return product;
    });
  }

  async update(id: string, data: UpdateProductInput) {
    await this.getById(id);
    if (data.sku) {
      const existing = await prisma.product.findFirst({ where: { sku: data.sku, NOT: { id } } });
      if (existing) throw new ConflictError('SKU already exists');
    }

    const { minStockLevel, maxStockLevel, reorderPoint, reorderQuantity, ...productData } = data;

    return prisma.$transaction(async (tx: any) => {
      const product = await tx.product.update({ where: { id }, data: productData, include: { category: true } });

      if (minStockLevel !== undefined || maxStockLevel !== undefined || reorderPoint !== undefined || reorderQuantity !== undefined) {
        await tx.inventory.update({
          where: { productId: id },
          data: {
            ...(minStockLevel !== undefined && { minStockLevel }),
            ...(maxStockLevel !== undefined && { maxStockLevel }),
            ...(reorderPoint !== undefined && { reorderPoint }),
            ...(reorderQuantity !== undefined && { reorderQuantity }),
          },
        });
      }

      return product;
    });
  }

  async delete(id: string) {
    await this.getById(id);
    return prisma.product.update({ where: { id }, data: { isActive: false } });
  }

  async getLowStockProducts() {
    return prisma.$queryRaw`
      SELECT p.id, p.sku, p.name, i."quantityOnHand", i."minStockLevel", i."reorderPoint"
      FROM products p
      JOIN inventory i ON i."productId" = p.id
      WHERE p."isActive" = true AND i."quantityOnHand" <= i."reorderPoint"
      ORDER BY i."quantityOnHand" ASC
    `;
  }
}

export const productService = new ProductService();