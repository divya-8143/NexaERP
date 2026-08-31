import { prisma } from '../../lib/prisma';
import { NotFoundError, AppError } from '../../lib/errors';
import { CreateGoodsReceiptInput } from '@nexaerp/shared';
import { generateGRNNumber } from '../../utils/sequenceGenerator';

export class GoodsReceiptService {
  async getAll(purchaseOrderId?: string) {
    return prisma.goodsReceipt.findMany({
      where: purchaseOrderId ? { purchaseOrderId } : undefined,
      include: {
        purchaseOrder: { include: { supplier: true } },
        items: true,
        createdBy: { select: { firstName: true, lastName: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getById(id: string) {
    const grn = await prisma.goodsReceipt.findUnique({
      where: { id },
      include: {
        purchaseOrder: { include: { supplier: true } },
        items: { include: { purchaseOrderItem: { include: { product: true } } } },
        createdBy: { select: { firstName: true, lastName: true } },
      },
    });
    if (!grn) throw new NotFoundError('Goods Receipt');
    return grn;
  }

  async create(data: CreateGoodsReceiptInput, createdById: string) {
    const po = await prisma.purchaseOrder.findUnique({
      where: { id: data.purchaseOrderId },
      include: { items: true },
    });
    if (!po) throw new NotFoundError('Purchase Order');
    if (!['SENT', 'PARTIALLY_RECEIVED'].includes(po.status)) {
      throw new AppError('Goods can only be received for SENT or PARTIALLY_RECEIVED orders', 400);
    }

    const grnNumber = await generateGRNNumber();

    return prisma.$transaction(async (tx: any) => {
      const grn = await tx.goodsReceipt.create({
        data: {
          grnNumber,
          purchaseOrderId: data.purchaseOrderId,
          receivedDate: new Date(data.receivedDate),
          notes: data.notes,
          createdById,
          items: {
            create: data.items.map(item => ({
              purchaseOrderItemId: item.purchaseOrderItemId,
              productId: item.productId,
              receivedQuantity: item.receivedQuantity,
              acceptedQuantity: item.acceptedQuantity,
              rejectedQuantity: item.rejectedQuantity,
              rejectionReason: item.rejectionReason,
              batchNumber: item.batchNumber,
              expiryDate: item.expiryDate ? new Date(item.expiryDate) : undefined,
            })),
          },
        },
        include: { items: true },
      });

      for (const item of data.items) {
        if (item.acceptedQuantity > 0) {
          const inventory = await tx.inventory.findUnique({ where: { productId: item.productId } });
          if (inventory) {
            const newQty = Number(inventory.quantityOnHand) + item.acceptedQuantity;
            await tx.inventory.update({
              where: { productId: item.productId },
              data: { quantityOnHand: newQty },
            });
            await tx.stockMovement.create({
              data: {
                productId: item.productId,
                type: 'IN',
                quantity: item.acceptedQuantity,
                previousQuantity: Number(inventory.quantityOnHand),
                newQuantity: newQty,
                referenceType: 'GRN',
                referenceId: grn.id,
                createdById,
              },
            });
          }
        }
        await tx.purchaseOrderItem.update({
          where: { id: item.purchaseOrderItemId },
          data: { receivedQuantity: { increment: item.acceptedQuantity } },
        });
      }

      const allItems = await tx.purchaseOrderItem.findMany({ where: { purchaseOrderId: data.purchaseOrderId } });
      const allReceived = allItems.every((i: any) => Number(i.receivedQuantity) >= Number(i.orderedQuantity));
      const anyReceived = allItems.some((i: any) => Number(i.receivedQuantity) > 0);

      await tx.purchaseOrder.update({
        where: { id: data.purchaseOrderId },
        data: {
          status: allReceived ? 'RECEIVED' : anyReceived ? 'PARTIALLY_RECEIVED' : po.status,
          actualDeliveryDate: allReceived ? new Date() : undefined,
        },
      });

      return grn;
    });
  }
}

export const goodsReceiptService = new GoodsReceiptService();