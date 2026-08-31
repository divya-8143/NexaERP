import { prisma } from '../../lib/prisma';
import { NotFoundError, AppError } from '../../lib/errors';
import { StockAdjustmentInput } from '@nexaerp/shared';
import { getPaginationParams, createPaginatedResponse, getSkip } from '../../utils/pagination';

export class InventoryService {
  async getAll(query: Record<string, unknown>) {
    const params = getPaginationParams(query);

    const [items, total] = await Promise.all([
      prisma.inventory.findMany({
        include: { product: { include: { category: true } } },
        orderBy: { lastUpdated: 'desc' },
        skip: getSkip(params.page, params.limit),
        take: params.limit,
      }),
      prisma.inventory.count(),
    ]);

    return createPaginatedResponse(items, total, params);
  }

  async getByProductId(productId: string) {
    const item = await prisma.inventory.findUnique({
      where: { productId },
      include: { product: { include: { category: true } } },
    });
    if (!item) throw new NotFoundError('Inventory record');
    return item;
  }

  async adjustStock(data: StockAdjustmentInput, createdById: string) {
    const inventory = await prisma.inventory.findUnique({ where: { productId: data.productId } });
    if (!inventory) throw new NotFoundError('Inventory record');

    const currentQty = Number(inventory.quantityOnHand);
    let newQty: number;

    switch (data.adjustmentType) {
      case 'INCREASE':
        newQty = currentQty + data.quantity;
        break;
      case 'DECREASE':
        newQty = currentQty - data.quantity;
        if (newQty < 0) throw new AppError('Insufficient stock for this adjustment', 400);
        break;
      case 'SET':
        newQty = data.quantity;
        break;
    }

    return prisma.$transaction(async (tx: any) => {
      const updated = await tx.inventory.update({
        where: { productId: data.productId },
        data: { quantityOnHand: newQty },
      });

      await tx.stockMovement.create({
        data: {
          productId: data.productId,
          type: 'ADJUSTMENT',
          quantity: data.quantity,
          previousQuantity: currentQty,
          newQuantity: newQty,
          reason: data.reason,
          notes: data.notes,
          createdById,
        },
      });

      return updated;
    });
  }

  async getStockMovements(productId: string, query: Record<string, unknown>) {
    const params = getPaginationParams(query);

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new NotFoundError('Product');

    const [movements, total] = await Promise.all([
      prisma.stockMovement.findMany({
        where: { productId },
        include: { product: true },
        orderBy: { createdAt: 'desc' },
        skip: getSkip(params.page, params.limit),
        take: params.limit,
      }),
      prisma.stockMovement.count({ where: { productId } }),
    ]);

    return createPaginatedResponse(movements, total, params);
  }

  async updateInventoryConfig(productId: string, data: { minStockLevel?: number; maxStockLevel?: number; reorderPoint?: number; reorderQuantity?: number; warehouseLocation?: string }) {
    const inventory = await prisma.inventory.findUnique({ where: { productId } });
    if (!inventory) throw new NotFoundError('Inventory record');

    return prisma.inventory.update({ where: { productId }, data });
  }
}

export const inventoryService = new InventoryService();